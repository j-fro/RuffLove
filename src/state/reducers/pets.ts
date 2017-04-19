import { Pet } from '../Pet';
import { IPetState } from '../state';
import { PetAction, ActionType } from '../actionsTypes';

const initialState: IPetState = {
    isFetching: false,
    petQueue: new Array<Pet>(),
    currentPet: null,
    error: {},
    offset: 0
};

export const petsReducer = (state = initialState, action: PetAction) => {
    switch (action.type) {
        case ActionType.advance_pet:
            const [currentPet, ...petQueue] = state.petQueue;
            return { ...state, currentPet, petQueue };
        case ActionType.request_pets_start:
            return { ...state, offset: Number(action.offset), isFetching: true };
        case ActionType.request_pets_success:
            return {
                ...state,
                petQueue: state.petQueue.concat(action.pets),
                isFetching: false,
                offset: action.offset,
                error: null,
            };
        case ActionType.request_pets_failure:
            return { ...state, error: action.error, isFetching: false };
        default:
            return state;
    }
};