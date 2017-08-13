import React, { Component } from 'react';
import { NavigationScreenProp, NavigationAction } from 'react-navigation';
import { Pet } from '../../../../state/Pet';
import FavoritesDetails from './FavoritesDetails';

export interface FavoritesDetailsContainerProps {
    navigation?: NavigationScreenProp<{ params: { pet?: Pet } }, NavigationAction>;
}

class FavoritesDetailsContainer extends Component<FavoritesDetailsContainerProps, any> {
    getPet(): Pet | undefined {
        if (this.props.navigation) {
            return this.props.navigation.state.params.pet;
        }
    }

    render() {
        const pet = this.getPet();
        if (pet) {
            return (
                <FavoritesDetails pet={pet} />
            );
        }
        else {
            return null;
        }
    }
}

export default FavoritesDetailsContainer;
