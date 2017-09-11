import { IProfileState } from '../state';
import { ProfileAction, ActionType } from '../actionTypes';

export const profileReducer = (
    state: IProfileState = { postalCode: '55401', petType: 'dog', viewedPetIDs: [] },
    action: ProfileAction
) => {
    switch (action.type) {
        case ActionType.ChangePostalCode:
            return { ...state, postalCode: String(action.postalCode) };
        case ActionType.SwitchPetType:
            return { ...state, petType: state.petType === 'dog' ? 'cat' : 'dog' };
        case ActionType.ChangeViewedPets:
            return { ...state, viewedPetIDs: action.viewedPetIDs };
        default:
            return state;
    }
};
