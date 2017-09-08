import { firebaseDB, Reference, Snapshot } from './firebase';

const USER_PATH = '/Users/';
const FAVORITES_PATH = '/favorites/';

function user(userID: string) {
    return firebaseDB.ref(USER_PATH).child(userID);
}

function userFavorite(userID: string, petID: string): Reference {
    return firebaseDB
        .ref(USER_PATH)
        .child(userID)
        .child(FAVORITES_PATH)
        .child(petID);
}

function userFavorites(userID: string) {
    return firebaseDB
        .ref(USER_PATH)
        .child(userID)
        .child(FAVORITES_PATH);
}

const databaseRef = {
    user,
    userFavorite,
    userFavorites
};

enum Events {
    Value = 'value'
}

export { databaseRef, Snapshot, Events };
