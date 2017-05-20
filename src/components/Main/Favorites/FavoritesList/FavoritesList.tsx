import React from 'react';
import { FlatList, FlatListProperties } from 'react-native';
import { Pet } from '../../../../state/Pet';

interface IFavoritesListProps extends FlatListProperties<Pet> { }

const FavoritesList = (props: IFavoritesListProps) => (
    <FlatList
        data={props.data}
        renderItem={props.renderItem}
        numColumns={2}
        keyExtractor={(item: Pet) => item.petfinderID}
    />
);

export default FavoritesList;