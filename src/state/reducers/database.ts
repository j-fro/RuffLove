import { Database } from '../database';
import { ActionType, actionTypes } from '../actionTypes';

export const databaseReducer = (
    state: Database = null,
    action: { type: ActionType, db: Database }) => {
    switch (action.type) {
        case actionTypes.init_db:
            return { ...state, db: action.db };
        default:
            return state;
    }
};