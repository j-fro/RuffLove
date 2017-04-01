import { actions, Action } from './actions';
import { Pet } from './Pet';

interface State {
    isFetching: boolean;
    error: object;
    pet: Pet;
    offset: number;
}

export default function pets(state =
    { isFetching: true, error: {}, pet: new Pet(), offset: 0 },
    action: Action
) {
    switch (action.type) {
        case actions.request_next_pet_start:
            return Object.assign({}, state, { isFetching: true });
        case actions.request_next_pet_success:
            return Object.assign({}, state, { isFetching: false, pet: action.pet, offset: action.offset });
        case actions.request_next_pet_failure:
            return Object.assign({}, state, { isFetching: false, error: action.error });
        default:
            return state;
    }
}