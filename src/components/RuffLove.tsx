import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import '../config/firebase';
import reducer from '../state/reducers';
import Main from './Main/Main';

const loggerMiddleware = createLogger();

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

interface IRuffLoveProps { }

interface IRuffLoveState { }

class RuffLove extends Component<IRuffLoveProps, IRuffLoveState> {
    render() {
        return (
            <Provider store={store}>
                <Main />
            </Provider>
        );
    }
}

export default RuffLove;