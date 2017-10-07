import { AuthAction, AuthActionType } from '../actions/auth';

export type AuthState = {
    isAuthenticated: boolean;
    userID: string;
    error: string | undefined;
};

const initialState: AuthState = { isAuthenticated: false, userID: '', error: undefined };

export default function authReducer(state = initialState, action: AuthAction): AuthState {
    switch (action.type) {
        case AuthActionType.ListenerEventAuthenticated:
            return { ...state, isAuthenticated: true, userID: action.userID };
        case AuthActionType.ListenerEventUnauthenticated:
            return { ...state, isAuthenticated: false, userID: '' };
        default:
            return state;
    }
}
