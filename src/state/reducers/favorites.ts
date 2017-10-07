import { FavoritesAction, ActionType } from '../actionTypes';
import { Pet } from '../Pet';

export type FavoritesState = {
    pets: Pet[];
    current: Pet | undefined;
    isFetching: boolean;
    error: string | undefined;
};

const initialState: FavoritesState = {
    isFetching: false,
    pets: [],
    current: undefined,
    error: undefined
};

export default function favoritesReducer(
    state = initialState,
    action: FavoritesAction
): FavoritesState {
    switch (action.type) {
        case ActionType.LoadFavoritesStart:
            return { ...state, isFetching: true };
        case ActionType.LoadFavoritesSuccess:
            if (action.favorites) {
                return { ...state, isFetching: false, pets: action.favorites };
            }
            return state;
        default:
            return state;
    }
}

export function getIsFetching() {}

export function getFavorites() {}

export function getCurrent() {}

export function getCurrentShelter() {}

export function getError() {}
