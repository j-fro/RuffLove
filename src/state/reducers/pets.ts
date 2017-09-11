import { Pet } from '../Pet';
import { IPetState } from '../state';
import { PetAction, ActionType } from '../actionTypes';

const initialState: IPetState = {
    isFetching: false,
    petQueue: new Array<Pet>(),
    currentPet: new Pet(''),
    error: {},
    offset: 0
};

export const petsReducer = (state = initialState, action: PetAction) => {
    switch (action.type) {
        case ActionType.AdvancePet:
            const [currentPet, ...petQueue] = state.petQueue;
            return { ...state, currentPet, petQueue };
        case ActionType.RequestPetsStart:
            return { ...state, offset: Number(action.offset), isFetching: true };
        case ActionType.RequestPetsSuccess:
            return {
                ...state,
                petQueue: state.petQueue.concat(action.pets || []),
                isFetching: false,
                offset: action.offset,
                error: null
            };
        case ActionType.RequestPetsFailure:
            return { ...state, error: action.error, isFetching: false, offset: state.offset + 10 };
        default:
            return state;
    }
};
