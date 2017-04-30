import firebase from 'firebase';
import { ProfileAction, ActionType } from '../actionsTypes';

const userPath = '/Users/';

export function listenerPostalCode(userID: string) {
    return async (dispatch: (action: ProfileAction) => void) => {
        dispatch({ type: ActionType.auth_listen_start });
        firebase.database().ref(`${userPath}${userID}/postalCode`).on('value', snapshot => {
            return dispatch({ type: ActionType.change_postal_code, postalCode: snapshot.val() })
        })
    };
}