import { ProfileAction, ActionType } from '../actionTypes';

export enum PetPreference {
    Dog = 'dog',
    Cat = 'cat'
}

export type State = {
    postalCode: string | null;
    preference: PetPreference;
    viewedPetIDs: string[];
    isSetup: boolean;
};

const initialState: State = {
    postalCode: null,
    preference: PetPreference.Dog,
    viewedPetIDs: [],
    isSetup: false
};

export default function profile(state = initialState, action: ProfileAction): State {
    switch (action.type) {
        case ActionType.ChangePostalCode:
            return { ...state, postalCode: String(action.postalCode) };
        case ActionType.SwitchPetType:
            return {
                ...state,
                preference: togglePreference(state)
            };
        case ActionType.ChangeViewedPets:
            return { ...state, viewedPetIDs: action.viewedPetIDs };
        default:
            return state;
    }
}

function togglePreference(state: State): PetPreference {
    return state.preference === PetPreference.Dog ? PetPreference.Cat : PetPreference.Dog;
}

export function getProfile(state: State): { postalCode: string | null; preference: PetPreference } {
    return { postalCode: state.postalCode, preference: state.preference };
}

export function getIsSetup(state: State): boolean {
    return state.isSetup;
}

export function getViewedPetIDs(state: State): string[] {
    return state.viewedPetIDs;
}
