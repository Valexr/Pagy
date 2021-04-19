const DEV = process.argv.includes('--dev');
const sveltePlugin = require("esbuild-svelte");
const sveltePreprocess = require("svelte-preprocess");
const svelteConfig = {
    compileOptions: {
        dev: DEV,
        css: false  //use `css:true` to inline CSS in `bundle.js`
    },
    preprocess: [
        sveltePreprocess({
            // postcss: true,
            // scss: { includePath: ['src', 'scss'] }
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

(async () => {
    const bundleServer = await build_server();
    const bundleClient = await build_client();

    if (DEV) {

        nodemon(path.join(CWD, 'app/server', 'server.js'), { cwd: path.join(CWD, 'app/server') });

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
        fs.unlink('app/server/server.js.map')
    }
})()

async function build_server() {
    return await build({
        entryPoints: ['src/server/main.js'],
        bundle: true,
        outfile: 'app/server/server.js',
        platform: 'node',
        sourcemap: DEV, // Use `DEV && 'inline'` to inline sourcemaps to the bundle
        minify: !DEV,
        incremental: DEV,
        // external: Object.keys(require('./package.json').dependencies),
        // external: ['mongoose'],
        plugins: [
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
        plugins: [
            sveltePlugin(svelteConfig)
        ]
    });
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
                    import {derver} from "derver";
                    import path from "path";
                    const DIR = path.join(__dirname,'../client');
                    export default function (options){
                        return derver({
                            dir: DIR,
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
                    import {derver} from "derver";
                    import path from "path";
                    const DIR = path.join(__dirname,'../client');
                    export default function (options){
                        return derver({
                            dir: DIR,
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
