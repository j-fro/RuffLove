import firebase from 'firebase';
import { ProfileAction, actionTypes } from '../actionTypes';

const userPath = '/Users/';

export function listenerPostalCode(userID: string) {
    return async (dispatch: (action: ProfileAction) => void) => {
        dispatch({ type: actionTypes.auth_listen_start } as ProfileAction);
        firebase.database().ref(`${userPath}${userID}/postalCode`).on('value', snapshot => {
            return dispatch({
                type: actionTypes.change_postal_code,
                postalCode: snapshot.val()
            } as ProfileAction)
        })
    };
}