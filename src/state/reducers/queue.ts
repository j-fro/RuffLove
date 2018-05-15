import { Pet } from '../Pet';
import { QueueAction as Action, queueActions as qa } from '../actions';

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

export default function queue(state = initialState, action: Action): State {
    switch (action.type) {
        case qa.ActionType.AdvancePet:
            const [current, ...pets] = state.pets;
            return { ...state, current, pets };
        case qa.ActionType.GetPetsRequest:
            return { ...state, isFetching: true };
        case qa.ActionType.GetPetsSuccess:
            return {
                ...state,
                pets: [...state.pets, ...action.pets],
                isFetching: false,
                error: undefined
            };
        case qa.ActionType.GetPetsFailure:
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
