import { AuthAction as Action, authActions } from '../actions';
const { ActionType } = authActions;

export type State = {
    isAuthenticated: boolean;
    userID: string;
    error: string | undefined;
};

const initialState: State = { isAuthenticated: false, userID: '', error: undefined };

function auth(state = initialState, action: Action): State {
    switch (action.type) {
        case ActionType.ListenerEventAuthenticated:
            return { ...state, isAuthenticated: true, userID: action.userID };
        case ActionType.ListenerEventUnauthenticated:
            return { ...state, isAuthenticated: false, userID: '' };
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
