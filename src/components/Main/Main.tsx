import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import PetSwiper from './PetSwiper';
import PetDetails from './PetDetails';
import { MainRoute } from '../../config/routes';

interface IMainProps { }

interface IMainState { }

export default class Main extends Component<IMainProps, IMainState> {
    static navigationOptions = {
        title: 'Ruff Love'
    };

    constructor(props: IMainProps, context: any) {
        super(props, context);

        console.log('Mainprops', props);
    }

    render() {
        const Nav = StackNavigator({
            [MainRoute[MainRoute.Swiper]]: { screen: PetSwiper },
            [MainRoute[MainRoute.Details]]: { screen: PetDetails }
        });

        return <Nav />;
    }
}