import './Resizable.scss';
import { FC } from 'react';
import { ResizableBox } from 'react-resizable';

interface ResizableProps {
    direction: 'horizontal' | 'vertical';
};

const Resizable: FC<ResizableProps> = ({ direction, children }) => {
    return (
        <ResizableBox 
            height={300}
            width={Infinity}
            minConstraints={[Infinity, window.innerHeight * 0.2]}
            maxConstraints={[Infinity, window.innerHeight * 0.9]}
            resizeHandles={direction === 'vertical' ? ['s'] : ['e']}>
            {children}
        </ResizableBox>
    );
};

export default Resizable;