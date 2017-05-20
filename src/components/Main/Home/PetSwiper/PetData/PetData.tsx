import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Pet } from '../../../../../state/Pet';
import { PortraitButton } from '../../../../common';
import styles from './styles';

interface IPetDataProps {
    isFetching: boolean;
    pet: Pet;
    onPress: () => void;
}

export default function PetData(props: IPetDataProps) {
    if (props.pet == null) {
        return (
            <View style={styles.shadowBox}>
                <ActivityIndicator size='large' />
            </View>
        );
    }

    return (
        <PortraitButton
            source={{ uri: props.pet.imageUrls[0] }}
            label={props.pet.name}
            onPress={props.onPress}
        />
    );
}
