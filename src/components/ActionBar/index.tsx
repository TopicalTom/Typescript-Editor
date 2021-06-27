import './ActionBar.scss';
import { FC } from 'react';
import { useActions } from '../../hooks/use-actions';

// Components
import ActionButton from '../ActionButton';

interface ActionBarProps {
    id: string
}

const ActionBar: FC<ActionBarProps> = ({ id }) => {
    const { moveCell, deleteCell } = useActions();

    return (
        <div className="action-bar">
            <ActionButton 
                callback={() => moveCell(id, 'up')} 
                iconName="fa-arrow-up" 
            />
            <ActionButton 
                callback={() => moveCell(id, 'down')} 
                iconName="fa-arrow-down" 
            />
            <ActionButton 
                callback={() => deleteCell(id)} 
                iconName="fa-times" 
            />
        </div>
    );
};

export default ActionBar;