import React, { Component } from 'react';
import { ListView, ListViewDataSource } from 'react-native';
import { NavigationAction, NavigationRoute, NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { IAppState } from '../../../../state/state';
import { Pet } from '../../../../state/Pet';
import { homeRoutes } from '../../../../config/routes';
import FavoritesList from './FavoritesList';
import Cell from './Cell';

interface IFavoritesListContainerProps {
    favorites: Pet[];
    navigation: NavigationScreenProp<NavigationRoute<{}>, NavigationAction>;
}

interface IFavoritesListContainerState {
    dataSource: ListViewDataSource;
}

interface IPetListItem {
    item: Pet;
}

class FavoritesListContainer
    extends Component<IFavoritesListContainerProps, IFavoritesListContainerState> {
    constructor(props: IFavoritesListContainerProps, context: any) {
        super(props, context);

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([])
        }
    }

    componentWillReceiveProps = ({ favorites }: IFavoritesListContainerProps) => {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(favorites)
        })
    }

    handleDetailPress = (pet: Pet) => {
        const { navigate } = this.props.navigation;
        navigate(homeRoutes.details);
    }

    renderItem = ({ item }: IPetListItem) => <Cell pet={item} />;

    render() {
        return (
            <FavoritesList data={this.props.favorites} renderItem={this.renderItem} />
        );
    }
}

function mapStateToProps({ favorites }: IAppState) {
    return {
        favorites: favorites.favorites
    };
}

export default connect(mapStateToProps)(FavoritesListContainer);