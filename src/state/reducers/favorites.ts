import { Pet } from '../Pet';
import { IFavoritesState } from '../state';
import { FavoritesAction, actionTypes } from '../actionTypes';

const initialState: IFavoritesState = {
    isFetching: false,
    favorites: new Array<Pet>()
};

export const favoritesReducer = (state = initialState, action: FavoritesAction) => {
    switch (action.type) {
        case actionTypes.load_favorites_start:
            return { ...state, isFetching: true };
        case actionTypes.load_favorites_success:
            return { ...state, isFetching: false, favorites: action.favorites }
        default:
            return state;
    }
};