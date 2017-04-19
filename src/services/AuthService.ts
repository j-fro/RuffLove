import { Store } from 'redux';
import { IDatabaseService } from './DatabaseService';
import { IAppState } from '../state/state';

export interface IAuthService { }

export class AuthService implements IAuthService {
    constructor(private db: IDatabaseService, private store: Store<IAppState>) { }
}