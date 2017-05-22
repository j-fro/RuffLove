export interface PetfinderGroupResult {
    petfinder: {
        lastOffset?: { $t: string },
        pets?: { pet: PetfinderPetResult[] },
        header: {
            status: {
                message: { $t: string },
                code: { $t: string }
            }
        }
    }
}

export interface PetfinderPetResult {
    options: { option: PetfinderGenericResult[] }
    status: { $t: string }
    contact: {
        phone: { $t?: string }
        state: { $t?: string }
        address2: { $t?: string }
        email: { $t?: string }
        city: { $t?: string }
        zip: { $t?: string }
        fax: { $t?: string }
        address1: { $t?: string }
    }
    age: { $t: string }
    size: { $t: string }
    media: { photos: { photo: PetfinderPhotoresult[] } }
    id: { $t: string }
    shelterPetId: { $t?: string }
    breeds: { breed: PetfinderGenericResult[] };
    name: { $t: string }
    sex: { $t: string }
    description: { $t: string }
    mix: { $t: string }
    shelterId: { $t: string }
    lastUpdate: { $t: string }
    animal: { $t: string }
}

interface PetfinderPhotoresult {
    '@size': string;
    $t: string;
    '@id': string;
}

interface PetfinderGenericResult {
    $t: string;
}