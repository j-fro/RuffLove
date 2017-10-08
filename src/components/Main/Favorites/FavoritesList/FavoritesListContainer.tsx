import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { favoritesSelectors, authSelectors, State } from '../../../../state/reducers';
import { favoritesActions } from '../../../../state/actions';
import { Pet } from '../../../../state/Pet';
import { homeRoutes } from '../../../../config/routes';
import Cell from './Cell';
import { Action } from 'redux';

type Props = NavigationScreenProps<void> & {
    favorites: Pet[];
    userID: string;
    dispatch: Function;
    viewFavorite: (id: string) => Action;
};

class FavoritesListContainer extends Component<Props, {}> {
    handleDetailPress(pet: Pet) {
        const { navigate } = this.props.navigation;
        this.props.viewFavorite(pet.petfinderID);
        navigate(homeRoutes.details);
    }

    handleRemovePress(pet: Pet) {
        if (this.props.userID) {
            favoritesActions.removeFavorite(this.props.userID, pet.petfinderID);
        } else {
            throw new Error('Cannot remove a favorite without a user ID');
        }
    }

    renderItem({ item }: { item: Pet }) {
        return (
            <Cell
                pet={item}
                onPress={() => this.handleDetailPress(item)}
                onLongPress={() => this.handleRemovePress(item)}
            />
        );
    }

    render() {
        return (
            <FlatList
                data={this.props.favorites}
                renderItem={item => this.renderItem(item)}
                numColumns={2}
                keyExtractor={(item: Pet) => item.petfinderID}
            />
        );
    }
}

function mapStateToProps(state: State) {
    return {
        favorites: favoritesSelectors.getFavorites(state),
        userID: authSelectors.getUserID(state)
    };
}

function mapDispatchToProps() {
    return {
        viewFavorite: favoritesActions.viewFavorite
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesListContainer);
