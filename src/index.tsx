import * as esbuild from 'esbuild-wasm';
import ReactDom from 'react-dom';
import { useState, useEffect, useRef } from 'react';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const App = () => {
    const ref = useRef<any>(null);
    const [ input, setInput ] = useState('');
    const [ code, setCode ] = useState('');

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
        });
    };

    const onClick = async () => {
        if(!ref.current) {
            return;
        };
        
        const result = await ref.current.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [
                unpkgPathPlugin(),
                fetchPlugin(input)
            ],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window',
            }
        });

        setCode(result.outputFiles[0].text);
    };

    useEffect(() => {
        startService();
    }, []);

    return (
        <div>
            <textarea 
                value={input} 
                onChange={(e) => setInput(e.target.value)}>
            </textarea>
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <pre>{code}</pre>
        </div>
    );
};

ReactDom.render(<App />, document.querySelector('#root'));