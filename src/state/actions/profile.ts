import { Dispatch } from 'redux';
import * as api from '../../api';
import { PetPreference } from '../reducers/profile';

type Action =
    | { type: ActionType.ChangePostalCode; postalCode: string }
    | { type: ActionType.UpdateViewedPets; viewedPetIDs: string[] }
    | { type: ActionType.SetPreference; preference: PetPreference }
    | { type: ActionType.TogglePreference | ActionType.LoadProfileRequest };

export default Action;

type DispatchProfile = Dispatch<Action>;

export enum ActionType {
    ChangePostalCode = 'profile/CHANGE_POSTAL_CODE',
    UpdateViewedPets = 'profile/UPDATE_VIEWED_PETS',
    TogglePreference = 'profile/TOGGLE_PREFERENCE',
    SetPreference = 'profile/SET_PREFERENCE',
    LoadProfileRequest = 'profile/LOAD_PROFILE:REQUEST',
    LoadProfileSuccess = 'profile/LOAD_PROFILE:SUCCESS',
    LoadProfileFailure = 'profile/LOAD_PROFILE:FAILURE'
}

export function changePostalCode(postalCode: string): Action {
    return { type: ActionType.ChangePostalCode, postalCode };
}

function changeViewedPetIDs(viewedPetIDs: string[]): Action {
    return { type: ActionType.UpdateViewedPets, viewedPetIDs };
}

export function togglePreference(): Action {
    return { type: ActionType.TogglePreference };
}

function setPreference(preference: string): Action {
    switch (preference) {
        case PetPreference.Cat:
            return { type: ActionType.SetPreference, preference: PetPreference.Cat };
        default:
            return { type: ActionType.SetPreference, preference: PetPreference.Dog };
    }
}

function dispatchProfileUpdates(dispatch: DispatchProfile, profile: api.ProfileData = {}) {
    if (profile.postalCode) {
        dispatch(changePostalCode(profile.postalCode));
    }
    if (profile.viewedPetIDs) {
        dispatch(changeViewedPetIDs(profile.viewedPetIDs));
    }
    if (profile.preference) {
        dispatch(setPreference(profile.preference));
    }
}

export function startProfileListener(userID: string) {
    return (dispatch: DispatchProfile) => {
        dispatch({ type: ActionType.LoadProfileRequest });
        api.subscribeToProfile(userID, data => {
            if (data) {
                dispatchProfileUpdates(dispatch, data);
            }
        });
    };
}
