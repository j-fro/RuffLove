import { combineReducers } from 'redux';
import auth from './auth';
import queue from './queue';
import profile from './profile';
import favorites from './favorites';

export default combineReducers({
    auth,
    queue,
    profile,
    favorites
});
