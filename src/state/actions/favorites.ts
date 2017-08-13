import firebase from 'firebase';
import { Pet } from '../Pet';
import { PetfinderSingleResult } from '../PetfinderResult';
import { ActionType, actionTypes, FavoritesAction } from '../actionTypes';
import config from '../../config/keys';

const USER_PATH = '/Users/';
const FAVORITES_PATH = '/favorites/';

export function addNewFavorite(userID: string, petfinderID: string) {
    return firebase
        .database()
        .ref(`${USER_PATH}${userID}${FAVORITES_PATH}${petfinderID}`)
        .set(new Date().toISOString());
}

export function removeFavorite(userID: string, petfinderID: string) {
    return firebase.database().ref(`${USER_PATH}${userID}${FAVORITES_PATH}${petfinderID}`).remove();
}

function getFavoritesFromSnapshot(snapshot: firebase.database.DataSnapshot | null) {
    if (snapshot) {
        return Promise.all(
            Object.keys(snapshot.val() || {})
                .map(key => fetchFavoritePet(key))
        );
    } else {
        return Promise.reject('');
    }
}

function filterValidFavorites(favorites: Pet[]) {
    return favorites.filter(pet => pet.petfinderID.length > 0);
}

function listenFavoritePets(dispatch: (action: FavoritesAction) => void, userID: string) {
    firebase
        .database()
        .ref(`${USER_PATH}${userID}${FAVORITES_PATH}`)
        .on('value', async snapshot => {
            let favorites = await getFavoritesFromSnapshot(snapshot);
            favorites = filterValidFavorites(favorites);
            dispatch({
                type: actionTypes.load_favorites_success as ActionType,
                favorites
            });
        });
}

function petQuery(petfinderID: string) {
    const query = `pet.get?id=${petfinderID}`;
    let url = `https://api.petfinder.com/${query}&format=json&key=${config.key}`;
    return url;
}

function fetchFavoritePet(petfinderID: string) {
    return fetch(petQuery(petfinderID))
        .then(res => res.json())
        .then((res: PetfinderSingleResult) => {
            const { pet } = res.petfinder;
            if (pet) {
                return Pet.fromPetfinder(pet);
            } else {
                return new Pet('');
            }
        });
}

export function startFavoritesListener(userID: string) {
    return (dispatch: (action: FavoritesAction) => void) => {
        dispatch({ type: actionTypes.load_favorites_start as ActionType });
        listenFavoritePets(dispatch, userID);
    };
}