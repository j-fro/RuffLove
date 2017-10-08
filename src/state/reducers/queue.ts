import { Pet } from '../Pet';
import { PetAction, ActionType } from '../actionTypes';

export type State = {
    isFetching: boolean;
    pets: Pet[];
    current: Pet | undefined;
    error: string | undefined;
};

const initialState: State = {
    isFetching: false,
    pets: [],
    current: undefined,
    error: undefined
};

export default function queue(state = initialState, action: PetAction): State {
    switch (action.type) {
        case ActionType.AdvancePet:
            const [current, ...pets] = state.pets;
            return { ...state, current, pets };
        case ActionType.RequestPetsStart:
            return { ...state, isFetching: true };
        case ActionType.RequestPetsSuccess:
            if (action.pets) {
                return {
                    ...state,
                    pets: [...state.pets, ...action.pets],
                    isFetching: false,
                    error: undefined
                };
            }
            return state;
        case ActionType.RequestPetsFailure:
            return { ...state, error: action.error, isFetching: false };
        default:
            return state;
    }
}

export function getIsFetching(state: State): boolean {
    return state.isFetching;
}

export function getQueueLength(state: State): number {
    return state.pets.length;
}

export function getCurrent(state: State): Pet | undefined {
    return state.current;
}

export function getError(state: State): string | undefined {
    return state.error;
}
