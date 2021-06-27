import { FC } from 'react';
import { Cell } from '../../state';
import CodeCell from '../CodeCell';
import TextEditor from '../TextEditor';

interface CellListItemProps {
    cell: Cell
}

const CellListItem: FC<CellListItemProps> = ({ cell }) => {
    return (
        <div>
            {cell && cell.type === 'code' 
                ?   <CodeCell cell={cell} />
                :   <TextEditor cell={cell} />
            }
        </div>
    );
};

export default CellListItem;