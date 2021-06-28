import { FC } from 'react';

interface AddButtonProps {
    callback: () => void;
    label: string
};

const AddButton: FC<AddButtonProps> = ({ callback, label}) => {
    return (
        <button 
            className="button is-rounded is-primary is-small"
            onClick={callback}>
            <span className="icon is-small">
                <i className="fa fa-plus" />
            </span>
            {label}
        </button>
    );
};

export default AddButton;