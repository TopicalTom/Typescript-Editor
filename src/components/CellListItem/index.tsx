import './CellListItem.scss';
import { FC } from 'react';
import { Cell } from '../../state';
import CodeCell from '../CodeCell';
import TextEditor from '../TextEditor';

// Components
import ActionBar from '../ActionBar';

interface CellListItemProps {
    cell: Cell
}

const CellListItem: FC<CellListItemProps> = ({ cell }) => {
    return (
        <div className="cell-list-item">
            {cell && cell.type === 'code' 
                ?   <>
                        <div className="action-bar-wrapper">
                            <ActionBar id={cell.id} />
                        </div>
                        <CodeCell cell={cell} />
                    </>
                :   <>
                        <ActionBar id={cell.id} />
                        <TextEditor cell={cell} />
                    </>
            }
        </div>
    );
};

export default CellListItem;