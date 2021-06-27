import './Resizable.scss';
import { FC, useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
    direction: 'horizontal' | 'vertical';
};

const Resizable: FC<ResizableProps> = ({ direction, children }) => {
    const [ innerHeight, setInnerHeight ] = useState(window.innerHeight);
    const [ innerWidth, setInnerWidth ] = useState(window.innerWidth);
    const [ width, setWidth ] = useState(window.innerWidth);

    // Listens for Browser Window resize events, with cleanup
    useEffect(() => {
        let timer: any;
        const listener = () => {
            if (timer) {
                clearTimeout(timer);
            };
            timer = setTimeout(() => {
                setInnerWidth(window.innerWidth);
                setInnerHeight(window.innerHeight);
                if (window.innerWidth * 0.75 < width) {
                    setWidth(window.innerWidth * 0.75);
                };
            }, 100);
        };
        window.addEventListener('resize', listener);

        return () => {
            window.removeEventListener('resize', listener);
        };
    }, [width]);

    let resizableProps: ResizableBoxProps;
    if (direction === 'horizontal') {
        resizableProps = {
            className: 'resize resize--horizontal',
            height: Infinity,
            width,
            minConstraints: [innerWidth * 0.2, Infinity],
            maxConstraints: [innerWidth * 0.75, Infinity],
            resizeHandles: ['e'],
            onResizeStop: (event, data) => {
                setWidth(data.size.width);
            }
        };
    } else {
        resizableProps = {
            className: 'resize',
            height: 300,
            width: Infinity,
            minConstraints: [Infinity, innerHeight * 0.2],
            maxConstraints: [Infinity, innerHeight * 0.9],
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