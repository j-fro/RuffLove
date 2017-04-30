import { Pet } from './Pet';
import { Database } from './database';

export interface IAppState {
    auth: IAuthState;
    profile: IProfileState;
    pets: IPetState;
    db: Database;
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