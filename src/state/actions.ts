import { Pet } from './Pet';
import config from '../config/keys';

export interface Action {
    type: string;
    offset: number;
    pet?: Pet;
    error?: Error;
}

export const actions = {
    like_pet: 'like_pet',
    skip_pet: 'skip_pet',
    request_pets_start: 'request_pets_start',
    request_pets_success: 'request_pets_success',
    request_pets_failure: 'request_pets_failure',
    request_next_pet_start: 'request_next_pet_start',
    request_next_pet_success: 'request_next_pet_success',
    request_next_pet_failure: 'request_next_pet_failure',
};

function requestNextPet(offset: number): Action {
    return { type: actions.request_next_pet_start, offset };
}

function receiveNextPet(offset: number, pet: Pet): Action {
    return { type: actions.request_next_pet_success, offset, pet };
}

export function fetchPet(offset: number, zip: string) {
    return (dispatch: Function) => {
        dispatch(requestNextPet(offset));

        let url = `https://api.petfinder.com/pet.find?animal=dog&count=1&location=${zip}&format=json&key=${config.key}`;
        if (offset) {
            url += `&offset=${offset}`;
        }

        return fetch(url)
            .then(res => res.json())
            .then((res: any) => {
                offset = res.petfinder.lastOffset.$t;
                let { pet } = res.petfinder.pets;
                pet = {
                    age: pet.age.$t,
                    name: pet.name.$t,
                    size: pet.size.$t,
                    desciption: pet.description.$t,
                    sex: pet.sex.$t,
                    imageUrls: pet.media.photos.photo
                        .filter((photo: any) => photo['@size'] === 'x')
                        .map((photo: any) => photo.$t)
                };
                dispatch(receiveNextPet(offset, pet));
            })
            .catch(err => err);
    };
}
