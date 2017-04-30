import firebase from 'firebase';
import { Pet } from '../Pet';
import { ActionType, FavoritesAction } from '../actionsTypes';
import config from '../../config/keys';

const userPath = '/Users/';

export function addNewFavorite(userID: string, petfinderID: number) {
    return firebase.database().ref(`/Users/${userID}/favorites/${petfinderID}`).set(new Date().toISOString())
}

export function listenFavorites(userID: string) {
    return (dispatch: (action: FavoritesAction) => void) => {
        dispatch({ type: ActionType.load_favorites_start });
        firebase.database().ref(`${userPath}${userID}/favorites`).on('value', snapshot => {
            const favorites = snapshot.val();
            Promise.all(
                Object.keys(favorites)
                    .map(key => fetchFavoritePet(key))
            )
                .then(favorites => dispatch({ type: ActionType.load_favorites_success, favorites: favorites }))
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