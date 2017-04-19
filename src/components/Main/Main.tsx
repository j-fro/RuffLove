import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { IAppState } from '../../state/state';
import { RootRoute } from '../../config/routes';
import { fetchPets, advancePet } from '../../state/actions';
import { Login } from '../Login';
import Home from './Home/Home';
import Profile from './Profile';

interface IMainProps {
    authenticated: boolean;
    dispatch: Function;
}

interface IMainState { }

class Main extends Component<IMainProps, IMainState> {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchPets()).then(() => dispatch(advancePet()));
    }

    render() {
        const Nav = TabNavigator(
            {
                [RootRoute[RootRoute.Main]]: { screen: Home },
                [RootRoute[RootRoute.Profile]]: { screen: Profile }
            },
            { initialRouteName: 'Profile' }
        );

        return this.props.authenticated
            ? <Nav {...this.props} />
            : <Login {...this.props} />;
    }

}

export default connect(({ auth }: IAppState) => ({ authenticated: auth.authenticated }))(Main);