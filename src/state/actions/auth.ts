import { firebaseAuth, User } from '../../config/firebase';
import { AuthAction, ActionType } from '../actionTypes';

export function register(email: string, password: string) {
    return async (dispatch: (action: AuthAction) => void) => {
        dispatch({ type: ActionType.RegisterStart });
        try {
            await firebaseAuth.createUserWithEmailAndPassword(email, password);
            dispatch({ type: ActionType.RegisterSuccess });
        } catch (error) {
            dispatch({ type: ActionType.RegisterError, error });
        }
    };
}

export function login(email: string, password: string) {
    return async (dispatch: (action: AuthAction) => void) => {
        dispatch({ type: ActionType.LoginStart as ActionType });
        try {
            await firebaseAuth.signInWithEmailAndPassword(email, password);
            dispatch({ type: ActionType.LoginSuccess as ActionType });
        } catch (error) {
            dispatch({ type: ActionType.LoginError as ActionType, error });
        }
    };
}

export function listenForAuth() {
    return async (dispatch: (action: AuthAction) => void) => {
        dispatch({ type: ActionType.AuthListenStart as ActionType });
        firebaseAuth.onAuthStateChanged((user?: User) => {
            if (user != null) {
                dispatch({
                    type: ActionType.AuthListenAuthenticated as ActionType,
                    userID: user.uid
                });
            }
        });
    };
}

export function logout() {
    return async (dispatch: (action: AuthAction) => void) => {
        dispatch({ type: ActionType.LogoutStart });
        await firebaseAuth.signOut();
        dispatch({ type: ActionType.LogoutSuccess });
    };
}
