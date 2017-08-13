import React from 'react';
import { StackNavigator } from 'react-navigation';
import FavoritesList from './FavoritesList';
import FavoritesDetails from './FavoritesDetails';
import { homeRoutes } from '../../../config/routes';

const Favorites = () => {
    const Nav = StackNavigator({
        [homeRoutes.favorites]: { screen: FavoritesList },
        [homeRoutes.details]: { screen: FavoritesDetails }
    });

    return <Nav />;
};

export default Favorites;