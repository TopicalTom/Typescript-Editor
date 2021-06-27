import { FC } from 'react';

interface ActionButtonProps {
    callback: () => void;
    iconName: string;
}

const ActionButton: FC<ActionButtonProps> = ({ callback, iconName }) => {
    return (
        <button 
            className="button is-primary is-small" 
            onClick={callback}>
            <span className="icon">
                <i className={`fas ${iconName}`}></i>
            </span>
        </button>
    );
};

export default ActionButton;