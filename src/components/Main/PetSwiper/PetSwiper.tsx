import React from 'react';
import { View, TouchableHighlight, Image } from 'react-native';
import PetData from './PetData';
import { Pet } from '../../../state/Pet';
import styles from './styles';

interface IPetSwiperProps {
    pet: Pet;
    isFetching: boolean;
    onNextPress: () => void;
}

export default function PetSwiper(props: IPetSwiperProps) {
    return (
        <View style={styles.container}>
            <PetData {...props} />
            <View style={styles.buttonStack}>
                <TouchableHighlight style={styles.button} onPress={props.onNextPress}>
                    <Image style={styles.icon} source={{}} />
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} onPress={props.onNextPress}>
                    <Image style={styles.icon} source={{}} />
                </TouchableHighlight>
            </View>
        </View>
    );
}