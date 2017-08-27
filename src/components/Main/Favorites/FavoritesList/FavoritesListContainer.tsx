import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { IAppState } from '../../../../state/state';
import { removeFavorite } from '../../../../state/actions';
import { Pet } from '../../../../state/Pet';
import { homeRoutes } from '../../../../config/routes';
import FavoritesList from './FavoritesList';
import Cell from './Cell';

type Props = NavigationScreenProps<void> & {
    favorites: Pet[];
    userID: string;
    dispatch: Function;
};

interface IPetListItem {
    item: Pet;
}

class FavoritesListContainer extends Component<Props, void> {
    handleDetailPress(pet: Pet) {
        const { navigate } = this.props.navigation;
        navigate(homeRoutes.details, { pet });
    }

    handleRemovePress(pet: Pet) {
        removeFavorite(this.props.userID, pet.petfinderID);
    }

    renderItem(pet: Pet) {
        return (
            <Cell
                pet={pet}
                onPress={() => this.handleDetailPress(pet)}
                onLongPress={() => this.handleRemovePress(pet)}
            />
        );
    }

    render() {
        return (
            <FavoritesList data={this.props.favorites} renderItem={item => this.renderItem(item)} />
        );
    }
}

function mapStateToProps({ favorites, auth }: IAppState) {
    return {
        favorites: favorites.favorites,
        userID: auth.userID
    };
}

export default connect(mapStateToProps)(FavoritesListContainer);
