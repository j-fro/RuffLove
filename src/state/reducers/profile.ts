import { IProfileState } from '../state';
import { ProfileAction, actionTypes } from '../actionTypes';

export const profileReducer = (
    state: IProfileState = { postalCode: '55401', petType: 'dog', viewedPetIDs: [] },
    action: ProfileAction
) => {
    switch (action.type) {
        case actionTypes.change_postal_code:
            return { ...state, postalCode: String(action.postalCode) };
        case actionTypes.switch_pet_type:
            return { ...state, petType: state.petType === 'dog' ? 'cat' : 'dog' };
        case actionTypes.change_viewed_pets:
            return { ...state, viewedPetIDs: action.viewedPetIDs };
        default:
            return state;
    }
};
