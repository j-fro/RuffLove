import { Dispatch } from 'redux';
import * as api from '../../api';

type Action =
    | { type: ActionType.ListenerEventAuthenticated; userID: string }
    | { type: ActionType.ListenerEventUnauthenticated; userID: null }
    | { type: ActionType.ChangeEmail; email: string }
    | { type: ActionType.ChangePassword; password: string }
    | { type: Failures; error: string }
    | { type: Requests | Successes };

export default Action;

type DispatchAuth = Dispatch<Action>;

export enum ActionType {
    ChangeEmail = 'auth/CHANGE_EMAIL',
    ChangePassword = 'auth/CHANGE_PASSWORD',
    RegisterRequest = 'auth/REGISTER:REQUEST',
    RegisterSuccess = 'auth/REGISTER:SUCCESS',
    RegisterFailure = 'auth/REGISTER:FAILURE',
    LoginEmailRequest = 'auth/LOGIN:EMAIL:REQUEST',
    LoginEmailSuccess = 'auth/LOGIN:EMAIL:SUCCESS',
    LoginEmailFailure = 'auth/LOGIN:EMAIL:FAILURE',
    LoginFacebookRequest = 'auth/LOGIN:FACEBOOK:REQUEST',
    LoginFacebookSuccess = 'auth/LOGIN:FACEBOOK:SUCCESS',
    LoginFacebookFailure = 'auth/LOGIN:FACEBOOK:FAILURE',
    LoginGoogleRequest = 'auth/LOGIN:GOOGLE:REQUEST',
    LoginGoogleSuccess = 'auth/LOGIN:GOOGLE:SUCCESS',
    LoginGoogleFailure = 'auth/LOGIN:GOOGLE:FAILURE',
    LogoutRequest = 'auth/LOGOUT:REQUEST',
    LogoutSuccess = 'auth/LOGOUT:SUCCESS',
    LogoutFailure = 'auth/LOGOUT:FAILURE',
    ListenerStart = 'auth/LISTENER:START',
    ListenerEventAuthenticated = 'auth/LISTENER:EVENT:AUTHENTICATED',
    ListenerEventUnauthenticated = 'auth/LISTENER:EVENT:UNAUTHENTICATED'
}

type Requests =
    | ActionType.ListenerStart
    | ActionType.LoginEmailRequest
    | ActionType.LoginFacebookRequest
    | ActionType.LoginGoogleRequest
    | ActionType.LogoutRequest
    | ActionType.RegisterRequest;
type Successes =
    | ActionType.LoginEmailSuccess
    | ActionType.LoginFacebookSuccess
    | ActionType.LoginGoogleSuccess
    | ActionType.LogoutSuccess
    | ActionType.RegisterSuccess;
type Failures =
    | ActionType.LoginEmailFailure
    | ActionType.LoginFacebookFailure
    | ActionType.LoginGoogleFailure
    | ActionType.LogoutFailure
    | ActionType.RegisterFailure;

export function changeEmail(email: string): Action {
    return { type: ActionType.ChangeEmail, email };
}

export function changePassword(password: string): Action {
    return { type: ActionType.ChangePassword, password };
}

export function register(email: string, password: string) {
    return async (dispatch: DispatchAuth) => {
        dispatch(registerRequest());
        try {
            await api.createEmailUser(email, password);
            dispatch(registerSuccess());
        } catch (error) {
            dispatch(registerFailure(error));
        }
    };
}

export function emailLogin(email: string, password: string) {
    return async (dispatch: DispatchAuth) => {
        dispatch(emailLoginRequest());
        try {
            await api.loginEmailUser(email, password);
            dispatch(emailLoginSuccess());
        } catch (error) {
            dispatch(emailLoginFailure(error));
        }
    };
}

export function facebookLogin() {
    return async (dispatch: DispatchAuth) => {
        dispatch(facebookLoginRequest());
        try {
            dispatch(facebookLoginSuccess());
        } catch (error) {
            dispatch(facebookLoginFailure(error));
        }
    };
}

export function googleLogin() {
    return async (dispatch: DispatchAuth) => {
        dispatch(googleLoginRequest());
        try {
            dispatch(googleLoginSuccess());
        } catch (error) {
            dispatch(googleLoginFailure(error));
        }
    };
}

export function logout() {
    return async (dispatch: DispatchAuth) => {
        dispatch(logoutRequest());
        try {
            await api.logout();
            dispatch(logoutSuccess());
        } catch (error) {
            dispatch(logoutFailure(error));
        }
    };
}

export function startAuthListener() {
    return async (dispatch: DispatchAuth) => {
        dispatch(listenerStart());
        api.subscribeToAuth(handleAuthEvent(dispatch));
    };
}

function handleAuthEvent(dispatch: DispatchAuth) {
    return (user: api.User | null) => {
        if (user) {
            dispatch(listenerEventAuthenticated(user.uid));
        } else {
            dispatch(listenerEventUnauthenticated());
        }
    };
}

function registerRequest(): Action {
    return { type: ActionType.RegisterRequest };
}

function registerSuccess(): Action {
    return { type: ActionType.RegisterSuccess };
}

function registerFailure(error: string): Action {
    return { type: ActionType.RegisterFailure, error };
}

function emailLoginRequest(): Action {
    return { type: ActionType.LoginEmailRequest };
}

function emailLoginSuccess(): Action {
    return { type: ActionType.LoginEmailSuccess };
}

function emailLoginFailure(error: string): Action {
    return { type: ActionType.LoginEmailFailure, error };
}

function facebookLoginRequest(): Action {
    return { type: ActionType.LoginFacebookRequest };
}

function facebookLoginSuccess(): Action {
    return { type: ActionType.LoginFacebookSuccess };
}

function facebookLoginFailure(error: string): Action {
    return { type: ActionType.LoginEmailFailure, error };
}

function googleLoginRequest(): Action {
    return { type: ActionType.LoginGoogleRequest };
}

function googleLoginSuccess(): Action {
    return { type: ActionType.LoginGoogleSuccess };
}

function googleLoginFailure(error: string): Action {
    return { type: ActionType.LoginGoogleFailure, error };
}

function logoutRequest(): Action {
    return { type: ActionType.LogoutRequest };
}

function logoutSuccess(): Action {
    return { type: ActionType.LogoutSuccess };
}

function logoutFailure(error: string): Action {
    return { type: ActionType.LogoutFailure, error };
}

function listenerStart(): Action {
    return { type: ActionType.ListenerStart };
}

function listenerEventAuthenticated(userID: string): Action {
    return { type: ActionType.ListenerEventAuthenticated, userID };
}

function listenerEventUnauthenticated(): Action {
    return { type: ActionType.ListenerEventUnauthenticated, userID: null };
}
