import { useState } from 'react';

// Bundler
import bundle from '../bundler';

// Components
import CodeEditor from './CodeEditor';
import CodePreview from './CodePreview';

const CodeCell = () => {
    const [ code, setCode ] = useState('');
    const [ input, setInput ] = useState('');

    // Takes editor code and transpiles it for preview window
    const onClick = async () => {
        const output = await bundle(input);
        setCode(output);
    };

    return (
        <div>
            <CodeEditor 
                initialValue=""
                onChange={(value) => setInput(value)}
            />
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <CodePreview 
                code={code}
            />
        </div>
    );
};

export default CodeCell;