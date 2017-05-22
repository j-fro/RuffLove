import { Pet } from './Pet';

export interface IAppState {
    auth: IAuthState;
    profile: IProfileState;
    pets: IPetState;
    favorites: IFavoritesState;
}

export interface IPetState {
    isFetching: boolean;
    offset: number;
    postalCode?: string;
    currentPet: Pet;
    petQueue: Pet[];
    error: object;
}

export interface IProfileState {
    postalCode?: string;
    petType: 'cat' | 'dog';
}

export interface IAuthState {
    email: string;
    password: string;
    authenticated: boolean;
    userID: string;
}

export interface IFavoritesState {
    isFetching: boolean;
    favorites: Pet[];
}