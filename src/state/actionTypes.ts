import { Pet } from './Pet';

export interface Action {
    type: string;
    offset?: number;
    pet?: Pet;
    pets?: Pet[];
    error?: Error;
    count?: number;
    postalCode?: string;
    userID?: string;
}

export type ProfileAction =
    | { type: ActionType.SwitchPetType }
    | { type: ActionType.ChangePostalCode; postalCode: string }
    | { type: ActionType.ChangeViewedPets; viewedPetIDs: string[] };

export interface PetAction {
    type: ActionType;
    offset?: number;
    pet?: Pet;
    pets?: Pet[];
    error?: string;
    count?: number;
}

// export interface AuthAction {
//     type: ActionType;
//     email?: string;
//     password?: string;
//     userID?: string;
//     error?: any;
// }

export type AuthAction = { type: ActionType.AuthListenAuthenticated; userID: string };

export interface FavoritesAction {
    type: ActionType;
    favorites?: Pet[];
}

export enum ActionType {
    LogoutStart = 'LOGOUT_START',
    LogoutSuccess = 'LOGOUT_SUCCESS',
    LikePet = 'LIKE_PET',
    SkipPet = 'SKIP_PET',
    RequestPetsStart = 'REQUEST_PETS_START',
    RequestPetsSuccess = 'REQUEST_PETS_SUCCESS',
    RequestPetsFailure = 'REQUEST_PETS_FAILURE',
    RequestNextPetStart = 'REQUEST_NEXT_PET_START',
    RequestNextPetSuccess = 'REQUEST_NEXT_PET_SUCCESS',
    RequestNextPetFailure = 'REQUEST_NEXT_PET_FAILURE',
    AdvancePet = 'ADVANCE_PET',
    ChangePostalCode = 'CHANGE_POSTAL_CODE',
    ChangeEmail = 'CHANGE_EMAIL',
    ChangePassword = 'CHANGE_PASSWORD',
    RegisterStart = 'REGISTER_START',
    RegisterSuccess = 'REGISTER_SUCCESS',
    RegisterError = 'REGISTER_ERROR',
    AuthListenStart = 'AUTH_LISTEN_START',
    AuthListenAuthenticated = 'AUTH_LISTEN_AUTHENTICATED',
    LoginStart = 'LOGIN_START',
    LoginSuccess = 'LOGIN_SUCCESS',
    LoginError = 'LOGIN_ERROR',
    SwitchPetType = 'SWITCH_PET_TYPE',
    InitDb = 'INIT_DB',
    LoadFavoritesStart = 'LOAD_FAVORITES_START',
    LoadFavoritesSuccess = 'LOAD_FAVORITES_SUCCESS',
    ProfileListenerStart = 'PROFILE_LISTENER_START',
    ProfileListenerSuccess = 'PROFILE_LISTENER_SUCCESS',
    ChangeViewedPets = 'CHANGE_VIEWED_PETS'
}
