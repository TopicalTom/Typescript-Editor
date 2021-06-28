import './AddCell.scss';
import { FC } from 'react';
import { useActions } from '../../hooks/use-actions';

// Components
import AddButton from '../AddButton';

interface AddCellProps {
    previousCellId: string | null;
    forceVisible?: boolean;
};

const AddCell: FC<AddCellProps> = ({ previousCellId, forceVisible }) => {
    const { insertCellAfter } = useActions();

    return (
        <div className={`add-cell ${forceVisible && 'force-visible'}`}>
            <div className="add-cell-container">
                <AddButton 
                    callback={() => insertCellAfter(previousCellId, 'code')}
                    label="Code"
                />
                <AddButton 
                    callback={() => insertCellAfter(previousCellId, 'text')}
                    label="Text"
                />
            </div>
            <div className="divider" />
        </div>
    );
};

export default AddCell;