import './CodeCell.scss';
import { FC, useEffect } from 'react';
import { Cell } from '../../state';
import { useActions } from '../../hooks/use-actions';
import { useTypedSelector } from '../../hooks/use-types-selector';
import { useCumulativeCode } from '../../hooks/use-cumulative-code';

// Components
import CodeEditor from '../CodeEditor';
import CodePreview from '../CodePreview';
import Resizable from '../Resizable';
import Progress from '../Progress';

interface CodeCellProps {
    cell: Cell
};

const CodeCell: FC<CodeCellProps> = ({ cell }) => {
    const { updateCell, createBundle } = useActions();
    const bundle = useTypedSelector((state) => state.bundles[cell.id]);
    const cumulativeCode = useCumulativeCode(cell.id);

    // Takes editor code and transpiles it for preview window
    useEffect(() => {

        // Creates initial bundle
        if(!bundle) {
            createBundle(cell.id, cumulativeCode);
            return;
        };

        // Transpiles new code on input pause
        const timer = setTimeout(async () => {
            createBundle(cell.id, cumulativeCode);
        }, 800);

        // Cancels action on new input
        return () => {
            clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cell.id, cumulativeCode, createBundle]);

    return (
        <Resizable direction="vertical">
            <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row'}}>
                <Resizable direction="horizontal">
                    <CodeEditor 
                        initialValue={cell.content}
                        onChange={(value) => updateCell(cell.id, value)}
                    />
                </Resizable>
                <div className="preview-wrapper">
                    {!bundle || bundle.loading
                        ?   <Progress label="Loading" />
                        :   <CodePreview code={bundle.code} err={bundle.err} />
                    }
                </div>
            </div>
        </Resizable>
    );
};

export default CodeCell;