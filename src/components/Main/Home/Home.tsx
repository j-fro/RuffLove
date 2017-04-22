import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import PetSwiper from './PetSwiper';
import PetDetails from './PetDetails';
import { homeRoutes } from '../../../config/routes';

interface IHomeProps { }

interface IHomeState { }

export default class Home extends Component<IHomeProps, IHomeState> {
    static navigationOptions = {
        title: 'Ruff Love'
    };

    render() {
        const Nav = StackNavigator({
            [homeRoutes.swiper]: { screen: PetSwiper },
            [homeRoutes.details]: { screen: PetDetails }
        });

        return <Nav />;
    }
}
