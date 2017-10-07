import { PetfinderPetResult } from './PetfinderResult';

export class Pet {
    constructor(
        public petfinderID: string,
        public name = '',
        public age = '',
        public size = '',
        public description = '',
        public sex = '',
        public imageUrls: string[] = []
    ) {}

    static fromPetfinder(petfinderResult: PetfinderPetResult): Pet {
        if (petfinderResult.media.photos) {
            return new Pet(
                petfinderResult.id.$t,
                petfinderResult.name.$t,
                petfinderResult.age.$t,
                petfinderResult.size.$t,
                petfinderResult.description.$t,
                petfinderResult.sex.$t,
                petfinderResult.media.photos.photo
                    .filter(photo => photo['@size'] === 'x')
                    .map(photo => photo.$t)
            );
        } else {
            throw new Error('Cannot make a pet without photos');
        }
    }
}
