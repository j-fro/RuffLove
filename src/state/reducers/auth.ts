import { AuthAction as Action, authActions } from '../actions';
const { ActionType } = authActions;

export type State = {
    isAuthenticated: boolean;
    userID: string;
    password: string;
    email: string;
    error: string | undefined;
};

const initialState: State = {
    isAuthenticated: false,
    userID: '',
    error: undefined,
    password: '',
    email: ''
};

function auth(state = initialState, action: Action): State {
    switch (action.type) {
        case ActionType.LoginEmailRequest:
        case ActionType.RegisterRequest:
            return { ...state, password: '' };
        case ActionType.ListenerEventAuthenticated:
            return { ...state, isAuthenticated: true, userID: action.userID };
        case ActionType.ListenerEventUnauthenticated:
            return { ...state, isAuthenticated: false, userID: '' };
        case ActionType.ChangeEmail:
            return { ...state, email: action.email };
        case ActionType.ChangePassword:
            return { ...state, password: action.password };
        default:
            return state;
    }
}

export default function handleError(state = initialState, action: Action): State {
    switch (action.type) {
        case ActionType.LoginEmailFailure:
        case ActionType.LoginFacebookFailure:
        case ActionType.LoginGoogleFailure:
        case ActionType.LogoutFailure:
        case ActionType.RegisterFailure:
            return auth({ ...state, error: action.error }, action);
        default:
            return auth({ ...state, error: undefined }, action);
    }
}

export function getIsAuthenticated(state: State): boolean {
    return state.isAuthenticated;
}

export function getUserID(state: State): string {
    return state.userID;
}

export function getError(state: State): string | undefined {
    return state.error;
}

export function getEmail(state: State): string {
    return state.email;
}

export function getPassword(state: State): string {
    return state.password;
}
