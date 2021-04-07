const DEV = process.argv.includes('--dev');

// Svelte compile configuration
const svelteConfig = {

    compileOptions:{
        dev: DEV,
        css: false  //use `css:true` to inline CSS in `bundle.js`
    },
    
    preprocess:[
        // Place here any Svelte preprocessors
    ]
    
}

/* Edit this file below only if know what you doing! */

const { fork } = require("child_process");
const { build } = require("esbuild");
const { createRemote } = require("derver");
const sveltePlugin = require("esbuild-svelte");
const watch = require("node-watch");
const path = require("path");

const CWD = process.cwd();

const remote = DEV && createRemote('svelte_derver_starter');

(async ()=>{
    const bundleServer = await build_server();
    const bundleClient = await build_client();

    if(DEV){
        
        nodemon(path.join(CWD,'dist','app.js'),{cwd:path.join(CWD,'dist')});
                
        watch(path.join(CWD,'src','client'),{ recursive: true }, async function() {
            try{
                await bundleClient.rebuild();
            }catch(err){
                remote.error(err.message,'Svelte compile error');
            }
        });

        watch(path.join(CWD,'src','server'),{ recursive: true }, async function() {
            await bundleServer.rebuild();
            await bundleClient.rebuild();
            console.log('Restarting server...');
        });
    }
})()

async function build_server(){
    return await build({
        entryPoints: ['src/server/main.js'],
        bundle: true,
        outfile: 'dist/app.js',
        platform: 'node',
        sourcemap: DEV, // Use `DEV && 'inline'` to inline sourcemaps to the bundle
        minify: !DEV,
        incremental: DEV,
        plugins:[
            plugin_server()
        ]
    });
}

async function build_client(){
    return await build({
        entryPoints: ['src/client/main.js'],
        bundle: true,
        outfile: 'dist/static/build/bundle.js',
        sourcemap: DEV, // Use `DEV && 'inline'` to inline sourcemaps to the bundle
        minify: !DEV,
        incremental: DEV,
        plugins: [
            sveltePlugin(svelteConfig)
        ]
    });
}

function plugin_server(){return {
    name: 'server-plugin',
    setup(b) {
        b.onResolve({ filter: /^@server$/ }, args => {

            return { path: DEV ? 'server_development.js' : 'server_production.js', namespace: 'server' }
        });
        
        b.onLoad({ filter: /^server_development\.js$/, namespace: 'server'}, (args) => {
            return {
                contents: `
                    import {derver} from "derver";
                    import path from "path";
                    const DIR = path.join(__dirname,'static');
                    export default function (options){
                        return derver({
                            dir: path.join(__dirname,'static'),
                            ...options,
                            remote: 'svelte_derver_starter'
                        });
                    }
                `,
                resolveDir: CWD
            }
        });

        b.onLoad({ filter: /^server_production\.js$/, namespace: 'server'}, (args) => {
            return {
                contents: `
                    import {derver} from "derver";
                    import path from "path";
                    const DIR = path.join(__dirname,'static');
                    export default function (options){
                        return derver({
                            dir: path.join(__dirname,'static'),
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

function nodemon (path,options){
    let child;
    const kill = ()=>{
        child && child.kill()
    }

    const start = () => {
        child = fork(path, [], options);
    }

    process.on('SIGTERM', kill);
    process.on('exit', kill);

    start();
    watch(path,()=>{
        kill();
        start();
    });
};
