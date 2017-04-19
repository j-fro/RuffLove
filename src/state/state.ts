import { Pet } from './Pet';

export interface IAppState {
    auth: IAuthState;
    profile: IProfileState;
    pets: IPetState;
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
}