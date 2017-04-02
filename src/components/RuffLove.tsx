import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from '../state/reducers';
import { fetchPet } from '../state/actions';
import Main from './Main/Main';
import { RootRoute } from '../config/routes';

const loggerMiddleware = createLogger();

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

interface IRuffLoveProps { }

interface IRuffLoveState { }

class RuffLove extends Component<IRuffLoveProps, IRuffLoveState> {
    componentDidMount() {
        store.dispatch(fetchPet(store.getState().offset, '55401'));
    }

    render() {
        const Nav = TabNavigator({
            [RootRoute.Main]: { screen: Main }
        });
        return <Provider store={store}><Nav {...this.props} /></Provider>;
    }
}

export default RuffLove;