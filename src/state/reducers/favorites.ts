import { Pet } from '../Pet';
import { IFavoritesState } from '../state';
import { FavoritesAction, ActionType } from '../actionTypes';

const initialState: IFavoritesState = {
    isFetching: false,
    favorites: new Array<Pet>()
};

export const favoritesReducer = (state = initialState, action: FavoritesAction) => {
    switch (action.type) {
        case ActionType.LoadFavoritesStart:
            return { ...state, isFetching: true };
        case ActionType.LoadFavoritesSuccess:
            return { ...state, isFetching: false, favorites: action.favorites };
        default:
            return state;
    }
};
