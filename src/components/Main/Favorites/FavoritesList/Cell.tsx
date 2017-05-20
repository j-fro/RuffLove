import React from 'react';
import { View } from 'react-native';
import { Pet } from '../../../../state/Pet';
import { PortraitButton } from '../../../common';
import styles from './styles';

interface ICellProps {
    pet: Pet
}

const Cell = ({ pet }: ICellProps) => (
    <View style={styles.cellContainer}>
        <PortraitButton source={{ uri: pet.imageUrls[0] }} label={pet.name} onPress={() => { }} />
    </View>
);

export default Cell;