import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
    name: 'filecache'
});

export const fetchPlugin = (inputCode: string) => {
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {   
            
            // Loads up the contents for ESbuild
            build.onLoad({ filter: /(^index\.js$)/ }, () => {
                return {
                    loader: 'jsx',
                    contents: inputCode,
                };
            });

            // Middleware loader for cache checks
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                // Checks if the bundle has already been fetched
                const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
                if (cachedResult) {
                    return cachedResult;
                };
            });

            // Loads up CSS files
            build.onLoad({ filter: /.css$/ }, async (args: any) => {
                const { data, request } = await axios.get(args.path);

                // Fixes any possible characters that break template string
                const escaped = data
                    .replace(/\n/g, '')
                    .replacee(/"/g, '\\"')
                    .replace(/'/g, "\\'");

                // Appends style tag to head of document
                const contents = `
                    const style = document.createElement('style);
                    style.innerText = '${escaped}';
                    document.head.appendChild(style);
                `;

                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents,
                    resolveDir: new URL ('./', request.responseURL).pathname,
                };

                await fileCache.setItem(args.path, result);

                return result;
            });
            
            // Loads up JSX files
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                const { data, request } = await axios.get(args.path);

                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents: data,
                    resolveDir: new URL ('./', request.responseURL).pathname,
                };

                await fileCache.setItem(args.path, result);

                return result;
            });
        }
    }
}