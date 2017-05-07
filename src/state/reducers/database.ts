import { Database } from '../database';
import { ActionType } from '../actionsTypes';

export const databaseReducer = (
    state: Database = null,
    action: { type: ActionType, db: Database }) => {
    switch (action.type) {
        case ActionType.init_db:
            return { ...state, db: action.db };
        default:
            return state;
    }
};