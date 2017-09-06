import React from 'react';
import Swiper from 'react-native-swiper';
import { View, Image, Dimensions, StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import * as colors from '../../config/colors';
import { styleConstants, rnAPIParams } from '../../config/constants';

const { width } = Dimensions.get(rnAPIParams.dimensions.WINDOW);

const style = StyleSheet.create<{ wrapper: ViewStyle; slide: ViewStyle; image: ImageStyle }>({
    wrapper: {
        height: width,
        backgroundColor: colors.PRIMARY,
        borderRadius: 3,
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 5,
            height: 5
        },
        elevation: 5
    },
    slide: {
        flex: 1,
        justifyContent: styleConstants.flexJustify.CENTER,
        alignItems: styleConstants.flexAlign.CENTER
    },
    image: { flex: 1 }
});

interface PetPhotoSwiperProps {
    imageURLs: string[];
}

function PetPhotoSwiper({ imageURLs }: PetPhotoSwiperProps) {
    return (
        // <View style={style.wrapper}>
        <Swiper
            style={style.wrapper}
            loadMinimal
            //height={width}
            //width={width - 20}
            showsButtons
            //removeClippedSubviews={false}
        >
            {imageURLs.map(uri => (
                <View key={uri} style={style.slide}>
                    <Image key={uri} style={style.image} source={{ uri }} />
                </View>
            ))}
        </Swiper>
        // </View>
    );
}

export default PetPhotoSwiper;
