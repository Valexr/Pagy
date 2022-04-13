const { build } = require("esbuild");
const { fork } = require("child_process");
const { createRemote } = require("derver");
const path = require("path");
const watch = require("node-watch");
const sveltePlugin = require("esbuild-svelte");
const sveltePreprocess = require("svelte-preprocess");
const { eslintPlugin } = require('esbuild-plugin-eslinter');

const CWD = process.cwd();
const DEV = process.argv.includes('--dev');
const remote = DEV && createRemote('svelte_derver_starter');

const svelteConfig = {
    compilerOptions: {
        dev: DEV,
        css: false
    },
    preprocess: [
        sveltePreprocess()
    ]
};

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
            plugin_server(),
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

function plugin_server() {
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
