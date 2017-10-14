import { Dispatch } from 'redux';
import { Pet } from '../Pet';
import { State, profileSelectors, queueSelectors } from '../reducers';
import * as api from '../../api';

type Action =
    | { type: ActionType.AdvancePet | ActionType.GetPetsRequest }
    | { type: ActionType.GetPetsSuccess; pets: Pet[] }
    | { type: ActionType.GetPetsFailure; error: string };

export default Action;

type DispatchQueue = Dispatch<Action>;

export enum ActionType {
    GetPetsRequest = 'queue/GET_PETS:REQUEST',
    GetPetsSuccess = 'queue/GET_PETS:SUCCESS',
    GetPetsFailure = 'queue/GET_PETS:FAILURE',
    AdvancePet = 'queue/ADVANCE_PET'
}

function getPetsRequest(): Action {
    return { type: ActionType.GetPetsRequest };
}

function getPetsSuccess(pets: Pet[]): Action {
    return { type: ActionType.GetPetsSuccess, pets };
}

function getPetsFailure(error: string): Action {
    return { type: ActionType.GetPetsFailure, error };
}

export function advancePet(): Action {
    return { type: ActionType.AdvancePet };
}

export function fetchPets() {
    return async (dispatch: DispatchQueue, getState: () => State) => {
        const state = getState();
        const profile = profileSelectors.getProfile(state);
        const queueLength = queueSelectors.getQueueLength(state);
        if (queueLength < 5) {
            let { postalCode, preference } = profile;
            dispatch(getPetsRequest());
            if (postalCode) {
                const pets = await api.getRandomPets(postalCode, preference);
                dispatch(getPetsSuccess(pets));
                const current = queueSelectors.getCurrent(state);
                if (current == undefined) {
                    dispatch(advancePet());
                }
            } else {
                dispatch(getPetsFailure('Cannot get pets without a postal code'));
            }
        }
    };
}
