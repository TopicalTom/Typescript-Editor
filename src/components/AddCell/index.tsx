import './AddCell.scss';
import { FC } from 'react';
import { useActions } from '../../hooks/use-actions';

// Components
import AddButton from '../AddButton';

interface AddCellProps {
    nextCellId: string | null;
    forceVisible?: boolean;
};

const AddCell: FC<AddCellProps> = ({ nextCellId, forceVisible }) => {
    const { insertCellBefore } = useActions();

    return (
        <div className={`add-cell ${forceVisible && 'force-visible'}`}>
            <div className="add-cell-container">
                <AddButton 
                    callback={() => insertCellBefore(nextCellId, 'code')}
                    label="Code"
                />
                <AddButton 
                    callback={() => insertCellBefore(nextCellId, 'text')}
                    label="Text"
                />
            </div>
            <div className="divider" />
        </div>
    );
};

export default AddCell;