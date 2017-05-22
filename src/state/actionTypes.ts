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

export interface ProfileAction {
    type: ActionType;
    postalCode?: string;
}

export interface PetAction {
    type: ActionType;
    offset?: number;
    pet?: Pet;
    pets?: Pet[];
    error?: string;
    count?: number;
}

export interface AuthAction {
    type: ActionType;
    email?: string;
    password?: string;
    userID?: string;
    error?: any;
}

export interface FavoritesAction {
    type: ActionType;
    favorites?: Pet[];
}

export type ActionType =
    'like_pet'
    | 'skip_pet'
    | 'request_pets_start'
    | 'request_pets_success'
    | 'request_pets_failure'
    | 'request_next_pet_start'
    | 'request_next_pet_success'
    | 'request_next_pet_failure'
    | 'advance_pet'
    | 'change_postal_code'
    | 'change_email'
    | 'change_password'
    | 'register_start'
    | 'register_success'
    | 'register_error'
    | 'auth_listen_start'
    | 'auth_listen_authenticated'
    | 'login_start'
    | 'login_success'
    | 'login_error'
    | 'switch_pet_type'
    | 'init_db'
    | 'load_favorites_start'
    | 'load_favorites_success'

export const actionTypes = {
    like_pet: 'like_pet',
    skip_pet: 'skip_pet',
    request_pets_start: 'request_pets_start',
    request_pets_success: 'request_pets_success',
    request_pets_failure: 'request_pets_failure',
    request_next_pet_start: 'request_next_pet_start',
    request_next_pet_success: 'request_next_pet_success',
    request_next_pet_failure: 'request_next_pet_failure',
    advance_pet: 'advance_pet',
    change_postal_code: 'change_postal_code',
    change_email: 'change_email',
    change_password: 'change_password',
    register_start: 'register_start',
    register_success: 'register_success',
    register_error: 'register_error',
    auth_listen_start: 'auth_listen_start',
    auth_listen_authenticated: 'auth_listen_authenticated',
    login_start: 'login_start',
    login_success: 'login_success',
    login_error: 'login_error',
    switch_pet_type: 'switch_pet_type',
    init_db: 'init_db',
    load_favorites_start: 'load_favorites_start',
    load_favorites_success: 'load_favorites_success',
}
