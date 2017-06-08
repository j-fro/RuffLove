import { PetfinderPetResult } from './PetfinderResult';

export class Pet {
    constructor(
        public petfinderID: string,
        public name = '',
        public age = '',
        public size = '',
        public description = '',
        public sex = '',
        public imageUrls = new Array<string>()
    ) { }

    static fromPetfinder(petfinderResult: PetfinderPetResult) {
        return new Pet(
            petfinderResult.id.$t,
            petfinderResult.name.$t,
            petfinderResult.age.$t,
            petfinderResult.size.$t,
            petfinderResult.description.$t,
            petfinderResult.sex.$t,
            petfinderResult.media.photos.photo
                .filter((photo: any) => photo['@size'] === 'x')
                .map((photo: any) => photo.$t))
    }
}