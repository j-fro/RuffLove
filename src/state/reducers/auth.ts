import { IAuthState } from '../state';
import { AuthAction, ActionType } from '../actionTypes';

export const authReducer = (
    state: IAuthState = { email: '', password: '', authenticated: false, userID: null },
    action: AuthAction
) => {
    switch (action.type) {
        case ActionType.AuthListenAuthenticated:
            return { ...state, authenticated: true, userID: action.userID };
        case ActionType.ChangeEmail:
            return { ...state, email: action.email };
        case ActionType.ChangePassword:
            return { ...state, password: action.password };
        default:
            return state;
    }
};
