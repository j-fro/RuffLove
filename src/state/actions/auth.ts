import firebase, { User } from 'firebase';
import { AuthAction, ActionType } from '../actionsTypes';

export function register(email: string, password: string) {
    return async (dispatch: (action: AuthAction) => void) => {
        dispatch({ type: ActionType.register_start });
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            dispatch({ type: ActionType.register_success });
        } catch (error) {
            dispatch({ type: ActionType.register_error, error });
        }
    };
}

export function login(email: string, password: string) {
    return async (dispatch: (action: AuthAction) => void) => {
        dispatch({ type: ActionType.login_start });
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            dispatch({ type: ActionType.login_success });
        } catch (error) {
            dispatch({ type: ActionType.login_error, error });
        }
    };
}

export function listenForAuth() {
    return async (dispatch: (action: AuthAction) => void) => {
        dispatch({ type: ActionType.auth_listen_start });
        firebase.auth().onAuthStateChanged((user: User) => {
            if (user) {
                dispatch({ type: ActionType.auth_listen_authenticated, user });
            }
        });
    };
}