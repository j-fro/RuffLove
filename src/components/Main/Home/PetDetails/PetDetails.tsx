import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text, PetPhotoSwiper } from '../../../common';
import { Pet } from '../../../../state/Pet';
import styles from './styles';

interface IPetDetailsProps {
    pet: Pet;
}

function PetDetails(props: IPetDetailsProps) {
    const { name, sex, age, size, description, imageUrls } = props.pet;

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <PetPhotoSwiper imageURLs={imageUrls} />
                <View style={styles.detailContainer}>
                    <Text.Name>
                        {name}
                    </Text.Name>
                    <Text.Detail>{`Sex: ${sex}`}</Text.Detail>
                    <Text.Detail>{`Age: ${age}`}</Text.Detail>
                    <Text.Detail>{`Size: ${size}`}</Text.Detail>
                    <Text.Description>
                        {description}
                    </Text.Description>
                </View>
            </ScrollView>
        </View>
    );
}

export default PetDetails;
