import { Dispatch } from 'redux';
import { Pet } from '../Pet';
import { PetfinderSingleResult } from '../PetfinderResult';
import * as api from '../../api';
import config from '../../config/keys';

type Action =
    | { type: ActionType.LoadFavoritesRequest }
    | { type: ActionType.LoadFavoritesSuccess; pets: Pet[] }
    | { type: ActionType.LoadFavoritesFailure; error: string }
    | { type: ActionType.ViewFavorite; petID: string };

export default Action;

type DispatchFavorites = Dispatch<Action>;

export enum ActionType {
    LoadFavoritesRequest = 'favorites/LOAD_FAVORITES:REQUEST',
    LoadFavoritesSuccess = 'favorites/LOAD_FAVORITES:SUCCESS',
    LoadFavoritesFailure = 'favorites/LOAD_FAVORITES:FAILURE',
    ViewFavorite = 'favorites/VIEW_FAVORITE'
}

export function addNewFavorite(userID: string, petfinderID: string): Promise<void> {
    return api.addNewFavorite(userID, petfinderID);
}

export function removeFavorite(userID: string, petfinderID: string): Promise<void> {
    return api.removeFavorite(userID, petfinderID);
}

function getFavoritesFromSnapshot(data: { [id: string]: string } | null) {
    if (data) {
        return Promise.all(Object.keys(data).map(id => fetchFavoritePet(id)));
    } else {
        return Promise.reject('Cannot fetch pets without data');
    }
}

function filterValidFavorites(favorites: Pet[]) {
    return favorites.filter(pet => pet.petfinderID.length > 0);
}

function listenFavoritePets(dispatch: DispatchFavorites, userID: string) {
    api.subscribeToFavorites(userID, async data => {
        try {
            let favorites = await getFavoritesFromSnapshot(data);
            favorites = filterValidFavorites(favorites);
            dispatch(loadFavoritesSuccess(favorites));
        } catch (error) {
            dispatch(loadFavoritesFailure(error));
        }
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
    return (dispatch: DispatchFavorites) => {
        dispatch(loadFavoritesRequest());
        listenFavoritePets(dispatch, userID);
    };
}

function loadFavoritesRequest(): Action {
    return { type: ActionType.LoadFavoritesRequest };
}

function loadFavoritesSuccess(pets: Pet[]): Action {
    return { type: ActionType.LoadFavoritesRequest, pets };
}

function loadFavoritesFailure(error: string): Action {
    return { type: ActionType.LoadFavoritesFailure, error };
}

export function viewFavorite(petID: string): Action {
    return { type: ActionType.ViewFavorite, petID };
}
