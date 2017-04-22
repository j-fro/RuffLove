import React from 'react';
import { View, Image, Text, ActivityIndicator, TouchableHighlight } from 'react-native';
import { Pet } from '../../../../../state/Pet';
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
            <TouchableHighlight style={styles.shadowBox} onPress={props.onPress}>
                <Image style={styles.portrait} source={{ uri: props.pet.imageUrls[0] }} />
            </TouchableHighlight>
            <Text style={styles.name}>{props.pet.name}</Text>
        </View>
    );
}
