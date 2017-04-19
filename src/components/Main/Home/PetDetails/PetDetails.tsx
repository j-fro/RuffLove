import React from 'react';
import { ScrollView, View, Text, Dimensions, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { Pet } from '../../../../state/Pet';
import styles from './styles';

const { width } = Dimensions.get('window');

interface IPetDetailsProps {
    pet: Pet;
}

function PetDetails(props: IPetDetailsProps) {
    const { name, sex, age, size, description, imageUrls } = props.pet;

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <View>
                    <Swiper
                        style={styles.wrapper}
                        loadMinimal
                        height={width}
                        width={width - 20}
                        showsButtons
                    >
                        {imageUrls.map(uri => (
                            <View key={uri} style={styles.slide}>
                                <Image key={uri} style={styles.image} source={{ uri }} />
                            </View>
                        ))}
                    </Swiper>
                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.detail}>{`Sex: ${sex}`}</Text>
                    <Text style={styles.detail}>{`Age: ${age}`}</Text>
                    <Text style={styles.detail}>{`Size: ${size}`}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </ScrollView>
        </View>
    );
}

export default PetDetails;