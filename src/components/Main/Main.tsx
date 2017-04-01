import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import PetSwiper from './PetSwiper';
import { main } from '../../config/routes';

interface IMainProps { }

interface IMainState { }

export default class Main extends Component<IMainProps, IMainState> {
    static navigationOptions = {
        title: 'Ruff Love'
    }

    constructor(props: IMainProps, context: any) {
        super(props, context);

        console.log('Mainprops', props);
    }

    render() {
        const Nav = StackNavigator({
            [main.swiper]: { screen: PetSwiper }
        });

        return <Nav />;
    }
}