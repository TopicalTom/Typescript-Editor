import { useState } from 'react';

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
    const onClick = async () => {
        const output = await bundle(input);
        setCode(output);
    };

    return (
        <Resizable direction="vertical">
            <div style={{ height: '100%', display: 'flex', flexDirection: 'row'}}>
                <CodeEditor 
                    initialValue=""
                    onChange={(value) => setInput(value)}
                />
                <CodePreview code={code} />
            </div>
        </Resizable>
    );
};

export default CodeCell;