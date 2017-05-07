import { database } from 'firebase';
import { ActionType } from './actionsTypes';

export class Database {
    _usersPath = '/Users/'
    _favoritesPath = '/favorites/'
    _viewedPath = '/viewed/'
    _likesPath = '/likes/'
    _likedBreedsPath = `${this._likesPath}breeds/`
    _likedSizesPath = `${this._likesPath}sizes/`
    _likedGendersPath = `${this._likesPath}genders/`
    _dislikesPath = '/dislikes/'
    _dislikedBreedsPath = `${this._likesPath}breeds/`
    _dislikedSizesPath = `${this._likesPath}sizes/`
    _dislikedGendersPath = `${this._likesPath}genders/`

    constructor(public userID: string, dispatch: Function) {
        this.postalCodeListener(dispatch);
    }

    postalCodeListener(dispatch: Function) {
        database().ref(`${this._usersPath}${this.userID}/postalCode`).on('value', snapshot => {
            return dispatch({ type: ActionType.change_postal_code, postalCode: snapshot.val() })
        })
    }

    addNewFavorite = (userID: string, petfinderID: string) =>
        database().ref(`${this._usersPath}${userID}${this._favoritesPath}`).push(petfinderID)

}