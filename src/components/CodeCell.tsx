import { useState, useEffect } from 'react';

// Bundler
import bundle from '../bundler';

// Components
import CodeEditor from './CodeEditor';
import CodePreview from './CodePreview';
import Resizable from './Resizeable';

const CodeCell = () => {
    const [ code, setCode ] = useState('');
    const [ input, setInput ] = useState('');

    // Takes editor code and transpiles it for preview window
    useEffect(() => {

        // Transpiles code on input pause
        const timer = setTimeout(async () => {
            const output = await bundle(input);
            setCode(output);
        }, 800);

        // Cancels action on new input
        return () => {
            clearTimeout(timer);
        };
    }, [input])

    return (
        <Resizable direction="vertical">
            <div style={{ height: '100%', display: 'flex', flexDirection: 'row'}}>
                <Resizable direction="horizontal">
                    <CodeEditor 
                        initialValue=""
                        onChange={(value) => setInput(value)}
                    />
                </Resizable>
                <CodePreview code={code} />
            </div>
        </Resizable>
    );
};

export default CodeCell;