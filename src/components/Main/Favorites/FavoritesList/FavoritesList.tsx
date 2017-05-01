import React from 'react';
import { ListView, ListViewProperties } from 'react-native';
import styles from './styles';

interface IFavoritesListProps extends ListViewProperties { }

const FavoritesList = ({ ref, ...props }: IFavoritesListProps) => (
    <ListView {...props} contentContainerStyle={styles.contentContainer} enableEmptySections />
);

export default FavoritesList;