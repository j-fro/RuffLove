import { ProfileAction, ActionType } from '../actionTypes';

export enum PetPreference {
    Dog = 'dog',
    Cat = 'cat'
}

export type ProfileState = {
    postalCode: string | null;
    preference: PetPreference;
    viewedPetIDs: string[];
    isSetup: boolean;
};

const initialState: ProfileState = {
    postalCode: null,
    preference: PetPreference.Dog,
    viewedPetIDs: [],
    isSetup: false
};

export default function profile(state = initialState, action: ProfileAction): ProfileState {
    switch (action.type) {
        case ActionType.ChangePostalCode:
            return { ...state, postalCode: String(action.postalCode) };
        case ActionType.SwitchPetType:
            return {
                ...state,
                preference:
                    state.preference === PetPreference.Dog ? PetPreference.Cat : PetPreference.Dog
            };
        case ActionType.ChangeViewedPets:
            return { ...state, viewedPetIDs: action.viewedPetIDs };
        default:
            return state;
    }
}
