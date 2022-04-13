function fix_svelte_path() {
    return {
        name: 'fix_svelte_path',
        setup(b) {
            b.onResolve({ filter: /^svelte$|^svelte\// }, args => {
                return { path: path.join(__dirname, 'node_modules', args.path, 'index.js') };
            });
        }
    };
}

let plugin_svelte = {
    name: 'svelte',
    setup(build) {
        let svelte = require('svelte/compiler');
        let path = require('path');
        let fs = require('fs');

        build.onLoad({ filter: /\.svelte$/ }, async (args) => {
            // This converts a message in Svelte's format to esbuild's format
            let convertMessage = ({ message, start, end }) => {
                let location;
                if (start && end) {
                    let lineText = source.split(/\r\n|\r|\n/g)[start.line - 1];
                    let lineEnd = start.line === end.line ? end.column : lineText.length;
                    location = {
                        file: filename,
                        line: start.line,
                        column: start.column,
                        length: lineEnd - start.column,
                        lineText,
                    };
                }
                return { text: message, location };
            };

            // Load the file from the file system
            let source = await fs.promises.readFile(args.path, 'utf8');
            let filename = path.relative(process.cwd(), args.path);

            // Convert Svelte syntax to JavaScript
            try {
                let { js, warnings } = svelte.compile(source, { filename });
                let contents = js.code + `//# sourceMappingURL=` + js.map.toUrl();
                return { contents, warnings: warnings.map(convertMessage) };
            } catch (e) {
                return { errors: [convertMessage(e)] };
            }
        });
    }
};

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

function removeMap(path) {
    fs.access(path, fs.F_OK, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        fs.unlink(path);
    });
}