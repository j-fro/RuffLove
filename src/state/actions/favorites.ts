import firebase from 'firebase';
import { Pet } from '../Pet';
import { ActionType, FavoritesAction } from '../actionsTypes';
import config from '../../config/keys';

const USER_PATH = '/Users/';
const PET_NOT_FOUND = ['pet id', 'not found']

export function addNewFavorite(userID: string, petfinderID: number) {
    return firebase.database().ref(`/Users/${userID}/favorites/${petfinderID}`).set(new Date().toISOString())
}

export function listenFavorites(userID: string) {
    return (dispatch: (action: FavoritesAction) => void) => {
        dispatch({ type: ActionType.load_favorites_start });
        firebase.database().ref(`${USER_PATH}${userID}/favorites`).on('value', snapshot => {
            const favorites = snapshot.val();
            Promise.all(
                Object.keys(favorites)
                    .map(key => fetchFavoritePet(key))
            )
                .then(favorites => favorites.filter(favorite => favorite.petfinderID > 0))
                .then(favorites => dispatch({ type: ActionType.load_favorites_success, favorites }))
        })
    };
}

function petQuery(petfinderID: string) {
    const query = `pet.get?id=${petfinderID}`;
    let url = `https://api.petfinder.com/${query}&format=json&key=${config.key}`;
    return url;
}

function fetchFavoritePet(petfinderID: string) {
    return fetch(petQuery(petfinderID))
        .then(res => res.json())
        .then((res: any) => {
            const error = checkErrorMessage(petfinderID, res.petfinder.header.status.message.$t)
            if (error) {
                return new Pet(0);
            }
            const { pet } = res.petfinder;
            return new Pet(
                pet.id.$t,
                pet.name.$t,
                pet.age.$t,
                pet.size.$t,
                pet.description.$t,
                pet.sex.$t,
                pet.media.photos.photo
                    .filter((photo: any) => photo['@size'] === 'x')
                    .map((photo: any) => photo.$t)
            );
        })
}

function checkErrorMessage(petfinderID: string, errorMessage: string) {
    if (errorMessage
        && errorMessage.includes(PET_NOT_FOUND[0])
        && errorMessage.includes(PET_NOT_FOUND[1])) {
        return { petfinderID, message: 'Sorry, one of your pets is no longer available' }
    }
}
