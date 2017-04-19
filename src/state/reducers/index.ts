import { combineReducers } from 'redux';

import { authReducer as auth } from './auth';
import { petsReducer as pets } from './pets';
import { profileReducer as profile } from './profile';

export default combineReducers({
    auth,
    pets,
    profile
});