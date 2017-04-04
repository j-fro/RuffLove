import { actions, Action } from './actions';
import { Pet } from './Pet';

export interface IAppState {
    isFetching: boolean;
    error: object;
    currentPet: Pet;
    nextPet?: Pet;
    offset: number;
    postalCode?: string;
}

export default function pets(state: IAppState = {
    isFetching: true,
    error: {},
    currentPet: null,
    nextPet: null,
    offset: 0,
    postalCode: '55401'
},
    action: Action
) {
    switch (action.type) {
        case actions.change_postal_code:
            return Object.assign({}, state, { postalCode: action.postalCode });
        case actions.advance_pet:
            return Object.assign({}, state, { currentPet: state.nextPet, nextPet: null });
        case actions.request_next_pet_start:
            return Object.assign({}, state, { isFetching: true, offset: 1 + state.offset });
        case actions.request_next_pet_success:
            return Object.assign({}, state, {
                isFetching: false,
                offset: action.offset
            }, state.currentPet ? { nextPet: action.pet } : { currentPet: action.pet });
        case actions.request_next_pet_failure:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error,
                offset: 1 + state.offset
            });
        default:
            return state;
    }
}