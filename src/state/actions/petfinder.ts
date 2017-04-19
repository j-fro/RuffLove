import { Pet } from '../Pet';
import { PetAction, ActionType } from '../actionsTypes';
import { IAppState } from '../state';
import config from '../../config/keys';

function requestPets(offset: number) {
    return { type: ActionType.request_pets_start, offset };
};

function receivePets(offset: number, pets: Pet[]) {
    return { type: ActionType.request_pets_success, offset, pets };
}

function errorPets(error: Error, count: number) {
    return { type: ActionType.request_pets_failure, error, count };
}

function petQuery(count: number, postalCode: string, offset: number, type: 'dog' | 'cat') {
    const query = `pet.find?animal=${type}&count=${count}&location=${postalCode}`;

    let url = `https://api.petfinder.com/${query}&format=json&key=${config.key}`;

    if (offset) {
        url += `&offset=${offset}`;
    }

    return url;
}

export function advancePet() {
    return (dispatch: (action: PetAction) => void) => {
        dispatch({ type: ActionType.advance_pet });
    }
}

export function fetchPets() {
    return (dispatch: (action: PetAction) => void, getState: () => IAppState) => {
        let { pets, profile } = getState();

        let offset: number;

        if (pets.petQueue.length < 5) {
            dispatch(requestPets(pets.offset));

            return fetch(petQuery(10, profile.postalCode, pets.offset, profile.petType))
                .then(res => res.json())
                .then((res: any) => {
                    offset = Number(res.petfinder.lastOffset.$t);
                    return res.petfinder.pets.pet
                        .map((pet: any) => ({
                            age: pet.age.$t,
                            name: pet.name.$t,
                            size: pet.size.$t,
                            description: pet.description.$t,
                            sex: pet.sex.$t,
                            imageUrls: pet.media.photos.photo
                                .filter((photo: any) => photo['@size'] === 'x')
                                .map((photo: any) => photo.$t)
                        }));
                })
                .then(pets => dispatch(receivePets(offset, pets)))
                .catch(error => dispatch(errorPets(error, 10)));
        }
    };
};
