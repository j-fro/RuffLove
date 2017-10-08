import React, { Component } from 'react';
import { TabNavigator, NavigationProp, NavigationRoute, NavigationAction } from 'react-navigation';
import { connect } from 'react-redux';
import { IAppState } from '../../state/state';
import { rootRoutes } from '../../config/routes';
import {
    fetchPets,
    advancePet,
    authActions,
    startProfileListener,
    favoritesActions
} from '../../state/actions';
import { Login } from '../Login';
import Home from './Home';
import Favorites from './Favorites';
import Profile from './Profile';

interface IMainProps {
    authenticated: boolean;
    userID: string;
    dispatch: Function;
    navigation: NavigationProp<NavigationRoute<{}>, NavigationAction>;
}

interface IMainState {}

class Main extends Component<IMainProps, IMainState> {
    constructor(props: IMainProps, context: any) {
        super(props, context);
        props.dispatch(authActions.startAuthListener());
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchPets()).then(() => dispatch(advancePet()));
    }

    componentWillReceiveProps(props: IMainProps) {
        console.log(props);
        const { dispatch, userID } = props;
        dispatch(startProfileListener(userID));
        dispatch(favoritesActions.startFavoritesListener(userID));
    }

    render() {
        const Nav = TabNavigator(
            {
                [rootRoutes.main]: { screen: Home },
                [rootRoutes.favorites]: { screen: Favorites },
                [rootRoutes.profile]: { screen: Profile }
            },
            { initialRouteName: rootRoutes.main, swipeEnabled: false }
        );

        return this.props.authenticated ? <Nav /> : <Login />;
    }
}

function mapStateToProps({ auth }: IAppState) {
    return { authenticated: auth.authenticated, userID: auth.userID };
}

export default connect(mapStateToProps)(Main);
