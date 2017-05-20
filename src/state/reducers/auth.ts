import { IAuthState } from '../state';
import { AuthAction, actionTypes } from '../actionTypes';

export const authReducer = (
    state: IAuthState = { email: null, password: null, authenticated: false, userID: null },
    action: AuthAction) => {
    switch (action.type) {
        case actionTypes.auth_listen_authenticated:
            return { ...state, authenticated: true, userID: action.userID };
        case actionTypes.change_email:
            return { ...state, email: action.email };
        case actionTypes.change_password:
            return { ...state, password: action.password };
        default:
            return state;
    }
};