import { Pet } from './Pet';

export interface Action {
    type: string;
    offset?: number;
    pet?: Pet;
    pets?: Pet[];
    error?: Error;
    count?: number;
    postalCode?: string;
    user?: any;
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
    error?: Error;
    count?: number;
}

export interface AuthAction {
    type: ActionType;
    email?: string;
    password?: string;
    user?: any;
    error?: any;
}

export enum ActionType {
    like_pet,
    skip_pet,
    request_pets_start,
    request_pets_success,
    request_pets_failure,
    request_next_pet_start,
    request_next_pet_success,
    request_next_pet_failure,
    advance_pet,
    change_postal_code,
    change_email,
    change_password,
    register_start,
    register_success,
    register_error,
    auth_listen_start,
    auth_listen_authenticated,
    login_start,
    login_success,
    login_error,
    switch_pet_type,
};

