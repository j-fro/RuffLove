import { Pet } from '../Pet';
import { IPetState } from '../state';
import { PetAction, actionTypes } from '../actionTypes';

const initialState: IPetState = {
    isFetching: false,
    petQueue: new Array<Pet>(),
    currentPet: new Pet(''),
    error: {},
    offset: 0
};

export const petsReducer = (state = initialState, action: PetAction) => {
    switch (action.type) {
        case actionTypes.advance_pet:
            const [currentPet, ...petQueue] = state.petQueue;
            return { ...state, currentPet, petQueue };
        case actionTypes.request_pets_start:
            return { ...state, offset: Number(action.offset), isFetching: true };
        case actionTypes.request_pets_success:
            return {
                ...state,
                petQueue: state.petQueue.concat(action.pets || []),
                isFetching: false,
                offset: action.offset,
                error: null
            };
        case actionTypes.request_pets_failure:
            return { ...state, error: action.error, isFetching: false, offset: state.offset + 10 };
        default:
            return state;
    }
};
