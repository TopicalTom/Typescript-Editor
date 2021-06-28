import './Progress.scss';
import { FC } from 'react';

interface ProgressProps {
    label: string
}

const Progress: FC<ProgressProps> = ({ label }) => {
    return (
        <div className="progress-cover">    
            <progress className="progress is-small is-primary" max="100">
                {label}
            </progress>
        </div>
    );
};

export default Progress;