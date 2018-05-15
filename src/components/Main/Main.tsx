import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { rootRoutes } from '../../config/routes';
import { queueActions, authActions, favoritesActions, profileActions } from '../../state/actions';
import { Login } from '../Login';
import Home from './Home';
import Favorites from './Favorites';
import Profile from './Profile';
import { Action } from 'redux';
import { State, authSelectors } from '../../state/reducers/index';

interface Props {
    authenticated: boolean;
    userID: string;
    dispatch: Function;
    fetchPets: () => () => Promise<Action>;
    startAuthListener: () => () => Promise<void>;
    startProfileListener: (userID: string) => () => Promise<void>;
    startFavoritesListener: (userID: string) => () => Promise<void>;
}

class Main extends Component<Props, {}> {
    constructor(props: Props, context: any) {
        super(props, context);
    }

    componentDidMount() {
        this.props.startAuthListener();
    }

    componentWillReceiveProps(props: Props) {
        const { userID } = props;
        this.props.startProfileListener(userID);
        this.props.startFavoritesListener(userID);
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

function mapStateToProps(state: State) {
    return {
        authenticated: authSelectors.getIsAuthenticated(state),
        userID: authSelectors.getUserID(state)
    };
}

// function mapDispatchToProps(dispatch: Dispatch<Action>) {
//     return {
//         fetchPets: () => dispatch(queueActions.fetchPets()),
//         startAuthListener: () => dispatch(authActions.startAuthListener()),
//         startProfileListener: (userID: string) =>
//             dispatch(profileActions.startProfileListener(userID)),
//         startFavoritesListener: (userID: string) =>
//             dispatch(favoritesActions.startFavoritesListener(userID))
//     };
// }

const { fetchPets } = queueActions;
const { startAuthListener } = authActions;
const { startProfileListener } = profileActions;
const { startFavoritesListener } = favoritesActions;

const mapDispatchToProps = {
    fetchPets,
    startAuthListener,
    startProfileListener,
    startFavoritesListener
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
