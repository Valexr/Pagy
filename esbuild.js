const DEV = process.argv.includes('--dev');
const sveltePlugin = require("esbuild-svelte");
const sveltePreprocess = require("svelte-preprocess");
const svelteConfig = {
    compilerOptions: {
        dev: DEV,
        css: false  //use `css:true` to inline CSS in `bundle.js`
    },
    preprocess: [
        sveltePreprocess({
            // sourceMap: DEV,
            // scss: {
            //     prependData: `
            //     @import './src/client/sass/spectre/variables';
            //     @import './src/client/sass/spectre/mixins';
            //     @import './src/client/sass/dark';
            // `,
            // },
            // postcss: true,
        })
    ]
}
const { fork } = require("child_process");
const { build } = require("esbuild");
const { createRemote } = require("derver");
const watch = require("node-watch");
const path = require("path");
const fs = require('fs/promises');
const CWD = process.cwd();
const remote = DEV && createRemote('svelte_derver_starter');

// function removeMap(path) {
//     fs.access(path, fs.F_OK, (err) => {
//         if (err) {
//             console.error(err)
//             return
//         }
//         fs.unlink(path)
//     })
// }

(async () => {
    const bundleServer = await build_server();
    const bundleClient = await build_client();

    if (DEV) {

        nodemon(path.join(CWD, 'app', 'app.js'), { cwd: path.join(CWD, 'app') });

        watch(path.join(CWD, 'src', 'client'), { recursive: true }, async function () {
            try {
                await bundleClient.rebuild();
            } catch (err) {
                remote.error(err.message, 'Svelte compile error');
            }
        });

        watch(path.join(CWD, 'src', 'server'), { recursive: true }, async function () {
            await bundleServer.rebuild();
            await bundleClient.rebuild();
            console.log('Restarting server...');
        });
    } else {
        fs.unlink('app/client/build/client.js.map')
        fs.unlink('app/app.js.map')
    }
})()


async function build_server() {
    return await build({
        entryPoints: ['src/server/main.js'],
        bundle: true,
        outfile: 'app/app.js',
        platform: 'node',
        sourcemap: DEV, // Use `DEV && 'inline'` to inline sourcemaps to the bundle
        minify: !DEV,
        incremental: DEV,
        legalComments: 'none',
        plugins: [
            // envPlugin(),
            plugin_server()
        ]
    });
}

// function fix_svelte_path() {
//     return {
//         name: 'fix_svelte_path',
//         setup(b) {
//             b.onResolve({ filter: /^svelte$|^svelte\// }, args => {
//                 return { path: path.join(__dirname,'node_modules',args.path,'index.js') }
//             });
//         }
//     }
// }

async function build_client() {
    return await build({
        entryPoints: ['src/client/main.js'],
        bundle: true,
        outfile: 'app/client/build/client.js',
        sourcemap: DEV, // Use `DEV && 'inline'` to inline sourcemaps to the bundle
        minify: !DEV,
        incremental: DEV,
        mainFields: ['svelte', 'module', 'main'],
        external: ['../img/*'],
        legalComments: 'none',
        plugins: [
            sveltePlugin(svelteConfig)
        ]
    });
}

let plugin_svelte = {
    name: 'svelte',
    setup(build) {
        let svelte = require('svelte/compiler')
        let path = require('path')
        let fs = require('fs')

        build.onLoad({ filter: /\.svelte$/ }, async (args) => {
            // This converts a message in Svelte's format to esbuild's format
            let convertMessage = ({ message, start, end }) => {
                let location
                if (start && end) {
                    let lineText = source.split(/\r\n|\r|\n/g)[start.line - 1]
                    let lineEnd = start.line === end.line ? end.column : lineText.length
                    location = {
                        file: filename,
                        line: start.line,
                        column: start.column,
                        length: lineEnd - start.column,
                        lineText,
                    }
                }
                return { text: message, location }
            }

            // Load the file from the file system
            let source = await fs.promises.readFile(args.path, 'utf8')
            let filename = path.relative(process.cwd(), args.path)

            // Convert Svelte syntax to JavaScript
            try {
                let { js, warnings } = svelte.compile(source, { filename })
                let contents = js.code + `//# sourceMappingURL=` + js.map.toUrl()
                return { contents, warnings: warnings.map(convertMessage) }
            } catch (e) {
                return { errors: [convertMessage(e)] }
            }
        })
    }
}

function plugin_env() {
    return {
        name: 'env',
        setup(build) {
            // Intercept import paths called "env" so esbuild doesn't attempt
            // to map them to a file system location. Tag them with the "env-ns"
            // namespace to reserve them for this plugin.
            build.onResolve({ filter: /^env$/ }, args => ({
                path: args.path,
                namespace: 'env-ns',
            }))

            // Load paths tagged with the "env-ns" namespace and behave as if
            // they point to a JSON file containing the environment variables.
            build.onLoad({ filter: /.*/, namespace: 'env-ns' }, () => ({
                contents: JSON.stringify(process.env),
                loader: 'json',
            }))
        },
    }
}

function plugin_server() {
    return {
        name: 'server-plugin',
        setup(b) {
            b.onResolve({ filter: /^@server$/ }, args => {
                return { path: DEV ? 'server_development.js' : 'server_production.js', namespace: 'server' }
            });

            b.onLoad({ filter: /^server_development\.js$/, namespace: 'server' }, (args) => {
                return {
                    contents: `
                    import 'dotenv/config'
                    import {derver} from "derver";
                    import path from "path";
                    const DIR = path.join(__dirname,'client');
                    export default function (options){
                        return derver({
                            dir: path.join(__dirname,'client'),
                            ...options,
                            remote: 'svelte_derver_starter'
                        });
                    }
                `,
                    resolveDir: CWD
                }
            });

            b.onLoad({ filter: /^server_production\.js$/, namespace: 'server' }, (args) => {
                return {
                    contents: `
                    import 'dotenv/config'
                    import {derver} from "derver";
                    import path from "path";
                    const DIR = path.join(__dirname,'client');
                    export default function (options){
                        return derver({
                            dir: path.join(__dirname,'client'),
                            cache: true,
                            compress: true,
                            watch: false,
                            host: "0.0.0.0",
                            ...options
                        });
                    }
                `,
                    resolveDir: CWD
                }
            });
        }
    }
}

function nodemon(path, options) {
    let child;
    const kill = () => {
        child && child.kill()
    }

    const start = () => {
        child = fork(path, [], options);
    }

    process.on('SIGTERM', kill);
    process.on('exit', kill);

    start();
    watch(path, () => {
        kill();
        start();
    });
};
