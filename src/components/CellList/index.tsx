import { FC, Fragment } from 'react';
import { useTypedSelector } from '../../hooks/use-types-selector';
import CellListItem from '../CellListItem';
import AddCell from '../AddCell';

const CellList: FC = () => {
    const cells = useTypedSelector(({ cells: { order, data } }) =>
        order.map((id) => data[id])
    );

    return (
        <div>
            {cells.map(cell => 
                <Fragment key={cell.id}>
                    <AddCell nextCellId={cell.id} />
                    <CellListItem cell={cell} />
                </Fragment>
            )}
            <AddCell 
                forceVisible={cells.length === 0} 
                nextCellId={null} 
            />
        </div>
    );
};

export default CellList;