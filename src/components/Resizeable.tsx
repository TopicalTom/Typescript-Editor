import './Resizable.scss';
import { FC, useEffect } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
    direction: 'horizontal' | 'vertical';
};

const Resizable: FC<ResizableProps> = ({ direction, children }) => {

    useEffect(() => {
        const listener = () => {
            console.log(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', listener);

        return () => {
            window.removeEventListener('resize', listener);
        };
    }, []);

    let resizableProps: ResizableBoxProps;
    if (direction === 'horizontal') {
        resizableProps = {
            className: 'resize resize--horizontal',
            height: Infinity,
            width: window.innerHeight * 0.75,
            minConstraints: [window.innerWidth * 0.2, Infinity],
            maxConstraints: [window.innerWidth * 0.75, Infinity],
            resizeHandles: ['e']
        };
    } else {
        resizableProps = {
            className: 'resize resize--vertical',
            height: 300,
            width: Infinity,
            minConstraints: [Infinity, window.innerHeight * 0.2],
            maxConstraints: [Infinity, window.innerHeight * 0.9],
            resizeHandles: ['s']
        };
    };

    return (
        <ResizableBox {...resizableProps}>
            {children}
        </ResizableBox>
    );
};

export default Resizable;