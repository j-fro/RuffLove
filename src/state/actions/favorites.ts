import firebase from 'firebase';

const database = firebase.database();

export const addNewFavorite = (userID: string, petfinderID: number) => (
    database.ref(`/Users/${userID}/favorites/${petfinderID}`).set(new Date().toISOString())
)