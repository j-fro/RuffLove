import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { IAppState } from '../../../../state/state';
import { removeFavorite } from '../../../../state/actions';
import { Pet } from '../../../../state/Pet';
import { homeRoutes } from '../../../../config/routes';
import Cell from './Cell';
import { FlatList } from 'react-native';

type Props = NavigationScreenProps<void> & {
    favorites: Pet[];
    userID: string | null;
    dispatch: Function;
};

class FavoritesListContainer extends Component<Props, {}> {
    handleDetailPress(pet: Pet) {
        const { navigate } = this.props.navigation;
        navigate(homeRoutes.details, { pet });
    }

    handleRemovePress(pet: Pet) {
        if (this.props.userID) {
            removeFavorite(this.props.userID, pet.petfinderID);
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

function mapStateToProps({ favorites, auth }: IAppState) {
    return {
        favorites: favorites.favorites,
        userID: auth.userID
    };
}

export default connect(mapStateToProps)(FavoritesListContainer);
