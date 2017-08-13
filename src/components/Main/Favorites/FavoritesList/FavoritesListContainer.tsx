import React, { Component } from 'react';
import { NavigationAction, NavigationRoute, NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { IAppState } from '../../../../state/state';
import { removeFavorite } from '../../../../state/actions';
import { Pet } from '../../../../state/Pet';
import { homeRoutes } from '../../../../config/routes';
import FavoritesList from './FavoritesList';
import Cell from './Cell';

interface IFavoritesListContainerProps {
    favorites: Pet[];
    userID: string;
    dispatch: Function;
    navigation: NavigationScreenProp<NavigationRoute<{}>, NavigationAction>;
}

interface IPetListItem {
    item: Pet;
}

class FavoritesListContainer extends Component<IFavoritesListContainerProps, void> {
    handleDetailPress = (pet: Pet) => {
        const { navigate } = this.props.navigation;
        navigate(homeRoutes.details, { pet });
    };

    handleRemovePress = (pet: Pet) => {
        removeFavorite(this.props.userID, pet.petfinderID);
    };

    renderItem = ({ item }: IPetListItem) => {
        return (
            <Cell
                pet={item}
                onPress={() => this.handleDetailPress(item)}
                onLongPress={() => this.handleRemovePress(item)}
            />
        );
    };

    render() {
        return <FavoritesList data={this.props.favorites} renderItem={this.renderItem} />;
    }
}

function mapStateToProps({ favorites, auth }: IAppState) {
    return {
        favorites: favorites.favorites,
        userID: auth.userID
    };
}

export default connect(mapStateToProps)(FavoritesListContainer);
