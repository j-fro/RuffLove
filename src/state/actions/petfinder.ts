import { Pet } from '../Pet';
import { PetAction, actionTypes } from '../actionTypes';
import { IAppState } from '../state';
import { PetfinderGroupResult, PetfinderPetResult } from '../PetfinderResult';
import config from '../../config/keys';

function requestPets(offset: number) {
    return { type: actionTypes.request_pets_start, offset } as PetAction;
};

function receivePets(offset: number, pets: Pet[]) {
    return { type: actionTypes.request_pets_success, offset, pets } as PetAction;
}

function errorPets(error: string, count: number) {
    return { type: actionTypes.request_pets_failure, error, count } as PetAction;
}


export function advancePet() {
    return (dispatch: (action: PetAction) => void) => {
        dispatch({ type: actionTypes.advance_pet } as PetAction);
    }
}

function buildPetQuery(count: number, postalCode: string, offset: number, type: 'dog' | 'cat') {
    const query = `pet.find?animal=${type}&count=${count}&location=${postalCode}`;
    let url = `https://api.petfinder.com/${query}&format=json&key=${config.key}`;
    if (offset) {
        url += `&offset=${offset}`;
    }
    return url;
}

async function fetchPetfinderResults(
    count: number,
    postalCode: string,
    offset: number,
    type: 'dog' | 'cat'
): Promise<PetfinderGroupResult> {
    const result = await fetch(buildPetQuery(count, postalCode, offset, type))
    return result.json();
}

function mapPetfinderToPet(pet: PetfinderPetResult) {
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
}

function processPetfinderResults(results: PetfinderGroupResult) {
    if (results.petfinder.pets != null && results.petfinder.lastOffset != null) {
        const newOffset = Number(results.petfinder.lastOffset.$t);
        const newPets = results.petfinder.pets.pet.map(mapPetfinderToPet);
        return receivePets(newOffset, newPets);
    }
    return errorPets(results.petfinder.header.status.message.$t, 10);

}

export function fetchPets() {
    return async (dispatch: (action: PetAction) => void, getState: () => IAppState) => {
        let { pets, profile } = getState();
        if (pets.petQueue.length < 5) {
            let { postalCode, petType } = profile
            dispatch(requestPets(pets.offset));
            const results = await fetchPetfinderResults(10, postalCode, pets.offset, petType);
            dispatch(processPetfinderResults(results));
        };
    }
}
