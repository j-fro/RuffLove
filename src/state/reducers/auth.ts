import { IAuthState } from '../state';
import { AuthAction, ActionType } from '../actionsTypes';

export const authReducer = (
    state: IAuthState = { email: null, password: null, authenticated: false, userID: null },
    action: AuthAction) => {
    switch (action.type) {
        case ActionType.auth_listen_authenticated:
            return { ...state, authenticated: true, userID: action.userID };
        case ActionType.change_email:
            return { ...state, email: action.email };
        case ActionType.change_password:
            return { ...state, password: action.password };
        default:
            return state;
    }
};