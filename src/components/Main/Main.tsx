import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { Database } from '../../state/database';
import { IAppState } from '../../state/state';
import { rootRoutes } from '../../config/routes';
import { fetchPets, advancePet, listenForAuth, listenerPostalCode } from '../../state/actions';
import { ActionType } from '../../state/actionsTypes';
import { Login } from '../Login';
import Home from './Home/Home';
import Profile from './Profile';

interface IMainProps {
    authenticated: boolean;
    userID: string;
    dispatch: Function;
}

interface IMainState { }

class Main extends Component<IMainProps, IMainState> {
    _db: Database;

    constructor(props: IMainProps, context: any) {
        super(props, context);
        props.dispatch(listenForAuth());
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchPets()).then(() => dispatch(advancePet()));
    }

    componentWillReceiveProps(props: IMainProps) {
        console.log(props);
        const { dispatch, userID } = props;
        dispatch(listenerPostalCode(userID));
    }

    render() {
        const Nav = TabNavigator(
            {
                [rootRoutes.main]: { screen: Home },
                [rootRoutes.profile]: { screen: Profile }
            },
            { initialRouteName: rootRoutes.main, swipeEnabled: false }
        );

        return this.props.authenticated
            ? <Nav {...this.props} />
            : <Login {...this.props} />;
    }

}

export default connect(({ auth }: IAppState) => ({ authenticated: auth.authenticated, userID: auth.userID }))(Main);