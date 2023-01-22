import { build, context } from "esbuild";
import { fork } from "child_process";
import { createRemote } from "derver";
import { join } from "path";
import watch from "node-watch";
import svelte from "esbuild-svelte";
import preprocess from "svelte-preprocess";
import eslint from './eslint.mjs';

const CWD = process.cwd();
const DEV = process.argv.includes('--dev');
const remote = DEV && createRemote('svelte_derver_starter');

const svelteConfig = {
    compilerOptions: {
        dev: DEV,
        css: false
    },
    preprocess: [
        preprocess({
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

const serverOptions = {
    bundle: true,
    minify: !DEV,
    platform: 'node',
    entryPoints: ['src/server/main.js'],
    outfile: 'app/app.js',
    sourcemap: DEV && 'inline',
    legalComments: 'none',
    plugins: [
        eslint()
    ]
};

const clientOptions = {
    bundle: true,
    minify: !DEV,
    entryPoints: ['src/client/main.js'],
    outfile: 'app/client/build/client.js',
    sourcemap: DEV && 'inline',
    mainFields: ['svelte', 'module', 'main'],
    external: ['../img/*'],
    legalComments: 'none',
    plugins: [
        svelte(svelteConfig),
        eslint()
    ]
};

if (DEV) {
    const server = await context(serverOptions);
    const client = await context(clientOptions);

    await server.rebuild();
    await client.rebuild();

    nodemon(join(CWD, 'app', 'app.js'), { cwd: join(CWD, 'app') });

    watch(join(CWD, 'src', 'client'), { recursive: true }, async () => {
        try {
            await client.rebuild();
        } catch (e) {
            remote.error(e.message, 'Svelte compile error');
        }
    });

    watch(join(CWD, 'src', 'server'), { recursive: true }, async () => {
        await server.rebuild();
        await client.rebuild();
        // console.log('Restarting server...');
    });
} else {
    await build(serverOptions);
    await build(clientOptions);
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
