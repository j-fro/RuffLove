import firebase, { User } from 'firebase';
import { AuthAction, ActionType, actionTypes } from '../actionTypes';

export function register(email: string, password: string) {
    return async (dispatch: (action: AuthAction) => void) => {
        dispatch({ type: actionTypes.register_start as ActionType });
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            dispatch({ type: actionTypes.register_success as ActionType });
        } catch (error) {
            dispatch({ type: actionTypes.register_error as ActionType, error });
        }
    };
}

export function login(email: string, password: string) {
    return async (dispatch: (action: AuthAction) => void) => {
        dispatch({ type: actionTypes.login_start as ActionType });
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            dispatch({ type: actionTypes.login_success as ActionType });
        } catch (error) {
            dispatch({ type: actionTypes.login_error as ActionType, error });
        }
    };
}

export function listenForAuth() {
    return async (dispatch: (action: AuthAction) => void) => {
        dispatch({ type: actionTypes.auth_listen_start as ActionType });
        firebase.auth().onAuthStateChanged((user?: User) => {
            if (user != null) {
                dispatch({
                    type: actionTypes.auth_listen_authenticated as ActionType,
                    userID: user.uid
                });
            }
        });
    };
}