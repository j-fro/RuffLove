import { Pet } from '../Pet';
import { PetAction, ActionType } from '../actionTypes';
import { IAppState } from '../state';
import { PetfinderSingleResult } from '../PetfinderResult';
import { buildQueryURL } from '../../utils/urlUtils';
import config from '../../config/keys';

function requestPets(offset: number) {
    return { type: ActionType.RequestPetsSuccess, offset } as PetAction;
}

function receivePets(offset: number, pets: Pet[]) {
    return { type: ActionType.RequestPetsSuccess, offset, pets } as PetAction;
}

function errorPets(error: string, count: number) {
    return { type: ActionType.RequestNextPetFailure, error, count } as PetAction;
}

export function advancePet() {
    return (dispatch: (action: PetAction) => void) => {
        dispatch({ type: ActionType.AdvancePet } as PetAction);
    };
}

function buildPetQuery(postalCode: string, type: 'dog' | 'cat') {
    const url = buildQueryURL('https://api.petfinder.com/pet.getRandom', {
        animal: type,
        location: postalCode,
        key: config.key,
        format: 'json',
        output: 'full'
    });
    return url;
}

async function fetchPetfinderResults(postalCode: string, type: 'dog' | 'cat'): Promise<PetfinderSingleResult> {
    const result = await fetch(buildPetQuery(postalCode, type));
    return result.json();
}

function processPetfinderResults(results: PetfinderSingleResult): Pet | undefined {
    if (results.petfinder.pet != null) {
        try {
            const pet = Pet.fromPetfinder(results.petfinder.pet);
            return pet;
        } catch (error) {
            console.log(error);
        }
    }
}

async function getRandomPets(postalCode: string, type: 'dog' | 'cat', pets: Pet[] = []): Promise<Pet[]> {
    const results = await fetchPetfinderResults(postalCode, type);
    const pet = processPetfinderResults(results);
    if (pet) {
        const updatedPets = [...pets, pet];
        if (updatedPets.length < 10) {
            return getRandomPets(postalCode, type, updatedPets);
        }
        return updatedPets;
    }
    return [];
}

export function fetchPets() {
    return async (dispatch: (action: PetAction) => void, getState: () => IAppState) => {
        let { pets, profile } = getState();
        if (pets.petQueue.length < 5) {
            let { postalCode, petType } = profile;
            dispatch(requestPets(pets.offset));
            if (postalCode) {
                const pets = await getRandomPets(postalCode, petType);
                dispatch(receivePets(0, pets));
            } else {
                dispatch(errorPets('Cannot get pets without a postal code', 0));
            }
        }
    };
}
