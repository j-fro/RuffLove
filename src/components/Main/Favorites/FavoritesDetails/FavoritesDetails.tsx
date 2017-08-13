import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, PetPhotoSwiper } from '../../../common';
import { primaryColor, secondaryBackground } from '../../../../config/colors';
import { Pet } from '../../../../state/Pet';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        backgroundColor: primaryColor
    },
    scrollContainer: {
        flex: 1,
        padding: 10
    },
    detailContainer: {
        backgroundColor: secondaryBackground,
        alignItems: 'center',
        flex: 1,
        marginTop: 10,
        marginBottom: 30,
        padding: 10,
        borderRadius: 3,
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 5,
            height: 5
        },
        elevation: 5
    },
});

interface FavoritesDetailsProps {
    pet: Pet;
}

function FavoritesDetails({ pet }: FavoritesDetailsProps) {
    const { name, sex, size, age, description, imageUrls } = pet;
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <View>
                    <PetPhotoSwiper imageURLs={imageUrls} />
                </View>
                <View style={styles.detailContainer}>
                    <Text.Name>{name}</Text.Name>
                    <Text.Detail>{`Sex: ${sex}`}</Text.Detail>
                    <Text.Detail>{`Age: ${age}`}</Text.Detail>
                    <Text.Detail>{`Size: ${size}`}</Text.Detail>
                    <Text.Description>{description}</Text.Description>
                </View>
            </ScrollView>
        </View>
    );
}

export default FavoritesDetails;