import { IProfileState } from '../state';
import { ProfileAction, ActionType } from '../actionsTypes';

export const profileReducer = (
    state: IProfileState = { postalCode: '55401', petType: 'dog' },
    action: ProfileAction) => {
    switch (action.type) {
        case ActionType.change_postal_code:
            return { ...state, postalCode: String(action.postalCode) };
        case ActionType.switch_pet_type:
            return { ...state, petType: state.petType === 'dog' ? 'cat' : 'dog' }
        default:
            return state;
    }
};