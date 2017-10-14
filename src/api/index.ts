import * as firebase from './firebase';
export { getRandomPets, getSinglePet } from './petfinder';

export function createEmailUser(email: string, password: string): Promise<firebase.User> {
    return firebase.firebaseAuth.createUserWithEmailAndPassword(email, password);
}

export function loginEmailUser(email: string, password: string): Promise<firebase.User> {
    return firebase.firebaseAuth.signInWithEmailAndPassword(email, password);
}

export function logout(): Promise<void> {
    return firebase.firebaseAuth.signOut();
}

export function subscribeToAuth(callback: (user: firebase.User | null) => void): () => void {
    return firebase.firebaseAuth.onAuthStateChanged(callback);
}

export function subscribeToProfile(userID: string, callback: (data: ProfileData | null) => void) {
    return firebase.databaseRef.user(userID).on(firebase.Events.Value, snapshot => {
        if (snapshot) {
            return callback(snapshot.val());
        }
        return callback(null);
    });
}

export function addNewFavorite(userID: string, petID: string) {
    return firebase.databaseRef.userFavorite(userID, petID).set(new Date().toISOString());
}

export function removeFavorite(userID: string, petID: string) {
    return firebase.databaseRef.userFavorite(userID, petID).remove();
}

export function subscribeToFavorites(
    userID: string,
    callback: (data: { [id: string]: string } | null) => void
) {
    return firebase.databaseRef.user(userID).on(firebase.Events.Value, snapshot => {
        if (snapshot) {
            return callback(snapshot.val());
        }
        return callback(null);
    });
}

export type User = firebase.User;

export type ProfileData = { postalCode?: string; preference?: string; viewedPetIDs?: string[] };
