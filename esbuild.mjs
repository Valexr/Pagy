import { build } from "esbuild";
import { fork } from "child_process";
import { createRemote } from "derver";
import { join } from "path";
import watch from "node-watch";
import sveltePlugin from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";
import { eslintPlugin } from 'esbuild-plugin-eslinter';

const CWD = process.cwd();
const DEV = process.argv.includes('--dev');
const remote = DEV && createRemote('svelte_derver_starter');
console.log(process.env);
const svelteConfig = {
    compilerOptions: {
        dev: DEV,
        css: false
    },
    preprocess: [
        sveltePreprocess({
            sourceMap: DEV,
            typescript: true,
            scss: {
                quietDeps: true,
                renderSync: true,
                prependData: `
                    @import './node_modules/spectre.css/src/variables';
                    @import './node_modules/spectre.css/src/mixins';
                `,
            }
        })
    ]
};

(async () => {
    const bundleServer = await build_server();
    const bundleClient = await build_client();

    if (DEV) {

        nodemon(join(CWD, 'app', 'app.js'), { cwd: join(CWD, 'app') });

        watch(join(CWD, 'src', 'client'), { recursive: true }, async function () {
            try {
                await bundleClient.rebuild();
            } catch (err) {
                remote.error(err.message, 'Svelte compile error');
            }
        });

        watch(join(CWD, 'src', 'server'), { recursive: true }, async function () {
            await bundleServer.rebuild();
            await bundleClient.rebuild();
            console.log('Restarting server...');
        });
    }
})();


async function build_server() {
    return await build({
        entryPoints: ['src/server/main.js'],
        bundle: true,
        outfile: 'app/app.js',
        platform: 'node',
        sourcemap: DEV && 'inline',
        minify: !DEV,
        incremental: DEV,
        legalComments: 'none',
        plugins: [
            // envPlugin(),
            serverPlugin(),
            eslintPlugin()
        ]
    });
}

async function build_client() {
    return await build({
        entryPoints: ['src/client/main.js'],
        bundle: true,
        outfile: 'app/client/build/client.js',
        sourcemap: DEV && 'inline',
        minify: !DEV,
        incremental: DEV,
        mainFields: ['svelte', 'module', 'main'],
        external: ['../img/*'],
        legalComments: 'none',
        plugins: [
            sveltePlugin(svelteConfig),
            eslintPlugin()
        ]
    });
}

function serverPlugin() {
    return {
        name: 'server-plugin',
        setup(b) {
            b.onResolve({ filter: /^@server$/ }, args => {
                return { path: DEV ? 'server_development.js' : 'server_production.js', namespace: 'server' };
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
                };
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
                };
            });
        }
    };
}

function envPlugin() {
    return {
        name: 'env',
        setup(build) {
            // Intercept import paths called "env" so esbuild doesn't attempt
            // to map them to a file system location. Tag them with the "env-ns"
            // namespace to reserve them for this plugin.
            build.onResolve({ filter: /^env$/ }, args => ({
                path: args.path,
                namespace: 'env-ns',
            }));

            // Load paths tagged with the "env-ns" namespace and behave as if
            // they point to a JSON file containing the environment variables.
            build.onLoad({ filter: /.*/, namespace: 'env-ns' }, () => ({
                contents: JSON.stringify(process.env),
                loader: 'json',
            }));
        },
    };
}

function nodemon(path, options) {
    let child;
    const kill = () => {
        child && child.kill();
    };

    const start = () => {
        child = fork(path, [], options);
    };

    process.on('SIGTERM', kill);
    process.on('exit', kill);

    start();
    watch(path, () => {
        kill();
        start();
    });
};
