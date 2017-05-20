import React from 'react';
import { StackNavigator } from 'react-navigation';
import FavoritesList from './FavoritesList';
import PetDetails from '../Home/PetDetails';
import { homeRoutes } from '../../../config/routes';

const Favorites = () => {
    const Nav = StackNavigator({
        [homeRoutes.favorites]: { screen: FavoritesList },
        [homeRoutes.details]: { screen: PetDetails }
    });

    return <Nav />
};

export default Favorites;