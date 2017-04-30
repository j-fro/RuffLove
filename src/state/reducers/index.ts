import { combineReducers } from 'redux';
import { authReducer as auth } from './auth';
import { petsReducer as pets } from './pets';
import { profileReducer as profile } from './profile';
import { databaseReducer as db } from './database';
import { favoritesReducer as favorites } from './favorites';

export default combineReducers({
    auth,
    pets,
    profile,
    db,
    favorites
});