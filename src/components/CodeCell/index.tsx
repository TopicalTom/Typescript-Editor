import { FC, useState, useEffect } from 'react';
import { Cell } from '../../state';
import { useActions } from '../../hooks/use-actions';

// Bundler
import bundle from '../../bundler';

// Components
import CodeEditor from '../CodeEditor';
import CodePreview from '../CodePreview';
import Resizable from '../Resizable';

interface CodeCellProps {
    cell: Cell
}

const CodeCell: FC<CodeCellProps> = ({ cell }) => {
    const [ code, setCode ] = useState('');
    const [ err, setErr ] = useState('');
    const { updateCell } = useActions();

    // Takes editor code and transpiles it for preview window
    useEffect(() => {

        // Transpiles code on input pause
        const timer = setTimeout(async () => {
            const output = await bundle(cell.content);
            setCode(output.code);
            setErr(output.err);
        }, 800);

        // Cancels action on new input
        return () => {
            clearTimeout(timer);
        };
    }, [cell.content]);

    return (
        <Resizable direction="vertical">
            <div style={{ height: '100%', display: 'flex', flexDirection: 'row'}}>
                <Resizable direction="horizontal">
                    <CodeEditor 
                        initialValue={cell.content}
                        onChange={(value) => updateCell(cell.id, value)}
                    />
                </Resizable>
                <CodePreview code={code} err={err} />
            </div>
        </Resizable>
    );
};

export default CodeCell;