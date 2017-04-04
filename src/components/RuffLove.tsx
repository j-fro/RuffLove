import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { RootRoute } from '../config/routes';
import { fetchPets, advancePet } from '../state/actions';
import reducer from '../state/reducers';
import Main from './Main/Main';
import Profile from './Profile';


const loggerMiddleware = createLogger();

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

interface IRuffLoveProps { }

interface IRuffLoveState { }

class RuffLove extends Component<IRuffLoveProps, IRuffLoveState> {
    componentDidMount() {
        store.dispatch(fetchPets())
            .then(() => store.dispatch(advancePet()));
    }

    render() {
        const Nav = TabNavigator({
            [RootRoute[RootRoute.Main]]: { screen: Main },
            [RootRoute[RootRoute.Profile]]: { screen: Profile }
        },
            { initialRouteName: 'Profile' });
        return <Provider store={store}><Nav {...this.props} /></Provider>;
    }
}

export default RuffLove;