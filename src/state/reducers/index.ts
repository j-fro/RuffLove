import { combineReducers } from 'redux';
import auth, * as fromAuth from './auth';
import queue, * as fromQueue from './queue';
import profile, * as fromProfile from './profile';
import favorites, * as fromFavorites from './favorites';

export type State = {
    favorites: fromFavorites.State;
    auth: fromAuth.State;
    queue: fromQueue.State;
    profile: fromProfile.State;
};

type SliceState = fromFavorites.State | fromAuth.State | fromQueue.State | fromProfile.State;

export default combineReducers({
    auth,
    queue,
    profile,
    favorites
});

const applySelector = <T>(fn: (sliceState: SliceState) => T, slice: keyof State) => (
    state: State
) => fn(state[slice]);

export const favoritesSelectors = {
    getCurrent: applySelector(fromFavorites.getCurrent, 'favorites'),
    getFavorites: applySelector(fromFavorites.getFavorites, 'favorites'),
    getError: applySelector(fromFavorites.getError, 'favorites'),
    getIsFetching: applySelector(fromFavorites.getIsFetching, 'favorites')
};

export const queueSelectors = {
    getCurrent: applySelector(fromQueue.getCurrent, 'queue'),
    getError: applySelector(fromQueue.getError, 'queue'),
    getIsFetching: applySelector(fromQueue.getIsFetching, 'queue'),
    getQueueLength: applySelector(fromQueue.getQueueLength, 'queue')
};

export const profileSelectors = {
    getIsSetup: applySelector(fromProfile.getIsSetup, 'profile'),
    getProfile: applySelector(fromProfile.getProfile, 'profile'),
    getViewedPetIDs: applySelector(fromProfile.getViewedPetIDs, 'profile')
};

export const authSelectors = {
    getUserID: applySelector(fromAuth.getUserID, 'auth'),
    getError: applySelector(fromAuth.getError, 'auth'),
    getIsAuthenticated: applySelector(fromAuth.getIsAuthenticated, 'auth')
};
