import React, { Component } from 'react';
import { ListView, ListViewDataSource } from 'react-native';
import { connect } from 'react-redux';
import { IAppState } from '../../../../state/state';
import { Pet } from '../../../../state/Pet';
import FavoritesList from './FavoritesList';
import Cell from './Cell';

interface IFavoritesListContainerProps {
    favorites: Pet[];
}

interface IFavoritesListContainerState {
    dataSource: ListViewDataSource;
}

class FavoritesListContainer extends Component<IFavoritesListContainerProps, IFavoritesListContainerState> {
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

    renderRow = (pet: Pet) => <Cell pet={pet} />;

    render() {
        return (
            <FavoritesList dataSource={this.state.dataSource} renderRow={this.renderRow} />
        );
    }
}

function mapStateToProps({ favorites }: IAppState) {
    return {
        favorites: favorites.favorites
    };
}

export default connect(mapStateToProps)(FavoritesListContainer);