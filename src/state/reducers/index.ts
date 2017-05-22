import { combineReducers } from 'redux';
import { authReducer as auth } from './auth';
import { petsReducer as pets } from './pets';
import { profileReducer as profile } from './profile';
import { favoritesReducer as favorites } from './favorites';

export default combineReducers({
    auth,
    pets,
    profile,
    favorites
});