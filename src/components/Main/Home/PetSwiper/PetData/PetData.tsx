import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
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
        <View style={styles.container}>
            <PortraitButton source={{ uri: props.pet.imageUrls[0] }} onPress={props.onPress} />
            <Text style={styles.name}>{props.pet.name}</Text>
        </View>
    );
}
