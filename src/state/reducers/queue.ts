import { Pet } from '../Pet';
import { PetAction, ActionType } from '../actionTypes';

export type QueueState = {
    isFetching: boolean;
    pets: Pet[];
    current: Pet | undefined;
    error: string | undefined;
};

const initialState: QueueState = {
    isFetching: false,
    pets: [],
    current: undefined,
    error: undefined
};

export default function queue(state = initialState, action: PetAction): QueueState {
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

export function getIsFetching() {}

export function getQueueLength() {}

export function getCurrent() {}

export function getError() {}
