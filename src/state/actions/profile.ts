import { databaseRef, Events } from '../../config/database';
import { ProfileAction, actionTypes } from '../actionTypes';

function changePostalCode(postalCode: string) {
    return { type: actionTypes.change_postal_code, postalCode } as ProfileAction;
}

function changeViewedPetIDs(viewedPetIDs: string[]) {
    return { type: actionTypes.change_viewed_pets, viewedPetIDs } as ProfileAction;
}

function dispatchProfileUpdates(dispatch: (action: ProfileAction) => void, profile: any) {
    if (profile.postalCode) {
        dispatch(changePostalCode(profile.postalCode));
    }
    if (profile.viewedPetIDs) {
        dispatch(changeViewedPetIDs(profile.viewedPetIDs));
    }
}

export function startProfileListener(userID: string) {
    return (dispatch: (action: ProfileAction) => void) => {
        dispatch({ type: actionTypes.profile_listener_start } as ProfileAction);
        databaseRef.user(userID).on(Events.Value, snapshot => {
            if (snapshot) {
                dispatchProfileUpdates(dispatch, snapshot.val());
            }
        });
    };
}
