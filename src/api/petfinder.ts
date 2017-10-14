import { buildQueryURL } from '../utils/urlUtils';
import { PetfinderSingleResult } from './PetfinderResult';
import { Pet } from '../state/Pet';
import { PetPreference } from '../state/reducers/profile';
import { key } from '../config/keys';

const PETFINDER_API = 'https://api.petfinder.com/';
const METHOD_RANDOM = 'pet.getRandom';
const METHOD_SINGLE = 'pet.get';

function buildPetSearchURL(postalCode: string, type: 'dog' | 'cat'): string {
    const url = buildQueryURL(PETFINDER_API + METHOD_RANDOM, {
        animal: type,
        location: postalCode,
        format: 'json',
        output: 'full',
        key
    });
    return url;
}

async function fetchPetfinderResults(
    postalCode: string,
    type: PetPreference
): Promise<PetfinderSingleResult> {
    const result = await fetch(buildPetSearchURL(postalCode, type));
    return result.json();
}

function processPetfinderResults(results: PetfinderSingleResult): Pet | undefined {
    if (results.petfinder.pet != null) {
        const pet = Pet.fromPetfinder(results.petfinder.pet);
        return pet;
    }
}

export async function getRandomPets(
    postalCode: string,
    type: PetPreference,
    pets: Pet[] = []
): Promise<Pet[]> {
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

function buildSinglePetURL(petfinderID: string): string {
    const url = buildQueryURL(PETFINDER_API + METHOD_SINGLE, {
        id: petfinderID,
        format: 'json',
        key
    });
    return url;
}

export async function getSinglePet(petfinderID: string): Promise<Pet> {
    const result = await fetch(buildSinglePetURL(petfinderID));
    const json: PetfinderSingleResult = await result.json();
    const { pet } = json.petfinder;
    if (pet) {
        return Pet.fromPetfinder(pet);
    } else {
        return new Pet('');
    }
}
