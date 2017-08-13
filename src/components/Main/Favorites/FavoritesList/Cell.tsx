import React from 'react';
import { View } from 'react-native';
import { Pet } from '../../../../state/Pet';
import { PortraitButton } from '../../../common';
import styles from './styles';

interface ICellProps {
    pet: Pet;
    onPress: () => void;
    onLongPress?: () => void;
}

const Cell = ({ pet, onPress, onLongPress }: ICellProps) => (
    <View style={styles.cellContainer}>
        <PortraitButton
            source={{ uri: pet.imageUrls[0] }}
            label={pet.name}
            onPress={onPress}
            onLongPress={onLongPress}
        />
    </View>
);

export default Cell;