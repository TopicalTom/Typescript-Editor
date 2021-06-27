import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

export interface CellsState {
    loading: boolean;
    error: string | null;
    order: string[];
    data: {
        [key: string]: Cell;
    }
};

const initialState: CellsState = {
    loading: false,
    error: null,
    order: [],
    data: {}
};

const reducer = produce((
    state: CellsState = initialState, 
    action: Action
): CellsState => {
    switch (action.type) {
        
        // Update Cell content
        case ActionType.UPDATE_CELL:
            const { id, content } = action.payload;
            state.data[id].content = content;
            return state;
        
        // Delete Cells
        case ActionType.DELETE_CELL:
            delete state.data[action.payload];
            state.order = state.order.filter(id => id !== action.payload);
            return state;
        
        // Move Cells up or down
        case ActionType.MOVE_CELL:
            const { direction } = action.payload;

            // Swapping logic
            const index = state.order.findIndex((id) => id === action.payload.id);
            const targetIndex = direction === 'up' ? index -1 : index + 1;
            if (targetIndex < 0 || targetIndex > state.order.length -1) {
                return state;
            };

            // Sets cells is desired locations
            state.order[index] = state.order[targetIndex];
            state.order[targetIndex] = action.payload.id;
            return state;
        
        // Add new cell infront, or at the end
        case ActionType.INSERT_CELL_BEFORE:
            
            // Generates new cell
            const cell: Cell = {
                content: '',
                type: action.payload.type,
                id: randomId()
            };
            state.data[cell.id] = cell;

            // Determines where to place cell
            const foundIndex = state.order.findIndex(id => id === action.payload.id);
            if (foundIndex < 0) {
                state.order.push(cell.id);
            } else {
                state.order.splice(foundIndex, 0, cell.id);
            }
            return state;
        
        default:
            return state;
    }
});

const randomId = () => {
    return Math.random().toString(36).substr(2, 5);
};

export default reducer;