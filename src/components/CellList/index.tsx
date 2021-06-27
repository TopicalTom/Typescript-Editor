import { FC } from 'react';
import { useTypedSelector } from '../../hooks/use-types-selector';
import CellListItem from '../CellListItem';

const CellList: FC = () => {
    const cells = useTypedSelector(({ cells: { order, data } }) =>
        order.map((id) => data[id])
    );

    return (
        <div>
            {cells.map(cell => 
                <CellListItem cell={cell} />
            )}
        </div>
    );
};

export default CellList;