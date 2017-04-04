import { actions, Action } from './actions';
import { Pet } from './Pet';

export interface IAppState {
    isFetching: boolean;
    error: object;
    currentPet: Pet;
    petQueue: Pet[];
    offset: number;
    postalCode?: string;
}

export default function pets(state: IAppState = {
    isFetching: true,
    error: {},
    currentPet: null,
    petQueue: new Array<Pet>(),
    offset: 0,
    postalCode: '55401'
},
    action: Action
) {
    switch (action.type) {
        case actions.change_postal_code:
            return Object.assign({}, state, { postalCode: action.postalCode });
        case actions.advance_pet:
            return Object.assign({}, state, { currentPet: state.petQueue.shift() });
        case actions.request_pets_start:
            return Object.assign({}, state, { isFetching: true, offset: Number(state.offset) });
        case actions.request_pets_success:
            return Object.assign({}, state, {
                isFetching: false,
                petQueue: state.petQueue.concat(action.pets),
                offset: Number(action.offset),
                error: null
            });
        case actions.request_pets_failure:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error,
                offset: action.offset || Number(state.offset) + action.count
            });
        case actions.request_next_pet_start:
            return Object.assign({}, state, {
                isFetching: true,
                offset: state.offset as number
            });
        case actions.request_next_pet_success:
            return Object.assign({}, state, {
                isFetching: false,
                offset: Number(action.offset),
                petQueue: state.petQueue.concat([action.pet])
            });
        case actions.request_next_pet_failure:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error,
                offset: state.offset as number
            });
        default:
            return state;
    }
}