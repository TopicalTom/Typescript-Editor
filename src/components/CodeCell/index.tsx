import './CodeCell.scss';
import { FC, useEffect } from 'react';
import { Cell } from '../../state';
import { useActions } from '../../hooks/use-actions';
import { useTypedSelector } from '../../hooks/use-types-selector';

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
    const cumulativeCode = useTypedSelector((state) => {
        const { data, order } = state.cells;
        const orderedCells = order.map(id => data[id]);

        const cumulativeCode = [];
        for (let c of orderedCells) {
            if (c.type === 'code') {
                cumulativeCode.push(c.content);
            };

            // Stop after current cell
            if (c.id === cell.id) {
                break;
            };
        };
        return cumulativeCode;
    });

    // Takes editor code and transpiles it for preview window
    useEffect(() => {

        // Creates initial bundle
        if(!bundle) {
            createBundle(cell.id, cumulativeCode.join('\n'));
            return;
        };

        // Transpiles new code on input pause
        const timer = setTimeout(async () => {
            createBundle(cell.id, cumulativeCode.join('\n'));
        }, 800);

        // Cancels action on new input
        return () => {
            clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cell.id, cumulativeCode.join('\n'), createBundle]);

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