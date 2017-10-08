import { FavoritesAction as Action, favoritesActions } from '../actions';
import { Pet } from '../Pet';

export type State = {
    pets: Pet[];
    current: Pet | undefined;
    isFetching: boolean;
    error: string | undefined;
};

const initialState: State = {
    isFetching: false,
    pets: [],
    current: undefined,
    error: undefined
};

function getPetByID(state: State, petID: string): Pet | undefined {
    return state.pets.find(p => p.petfinderID === petID);
}

export default function favorites(state = initialState, action: Action): State {
    switch (action.type) {
        case favoritesActions.ActionType.LoadFavoritesRequest:
            return { ...state, isFetching: true };
        case favoritesActions.ActionType.LoadFavoritesSuccess:
            return { ...state, isFetching: false, pets: action.pets };
        case favoritesActions.ActionType.LoadFavoritesFailure:
            return { ...state, isFetching: false, error: action.error };
        case favoritesActions.ActionType.ViewFavorite:
            return { ...state, current: getPetByID(state, action.petID) };
        default:
            return state;
    }
}

export function getIsFetching(state: State): boolean {
    return state.isFetching;
}

export function getFavorites(state: State): Pet[] {
    return state.pets;
}

export function getCurrent(state: State): Pet | undefined {
    return state.current;
}

export function getCurrentShelter(state: State): {} {
    // TODO: Implement
    return state.current || {};
}

export function getError(state: State): string | undefined {
    return state.error;
}
