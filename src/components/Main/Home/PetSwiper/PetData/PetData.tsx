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
        <TouchableHighlight style={styles.shadowBox} onPress={props.onPress}>
            <View style={styles.container}>
                <Image style={styles.portrait} source={{ uri: props.pet.imageUrls[0] }} />
                <Text style={styles.name}>{props.pet.name}</Text>
            </View>
        </TouchableHighlight>
    );
}
