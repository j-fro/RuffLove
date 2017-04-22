import React from 'react';
import { View, Image, Animated, GestureResponderHandlers, LayoutChangeEvent } from 'react-native';
import PetData from './PetData';
import { Pet } from '../../../../state/Pet';
import { Button } from '../../../common/';
import { acceptIcon, declineIcon } from '../../../../config/images';
import styles from './styles';

interface IPetSwiperProps {
    pet: Pet;
    isFetching: boolean;
    onNextPress: () => void;
    onDetailsPress: () => void;
    panHandlers: GestureResponderHandlers;
    panLayout: { [key: string]: Animated.Animated };
    setLeftDropZoneValues: (_: LayoutChangeEvent) => void;
    setRightDropZoneValues: (_: LayoutChangeEvent) => void;
}

export default function PetSwiper(props: IPetSwiperProps) {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <View onLayout={props.setLeftDropZoneValues} style={{ width: 30 }} />
                <Animated.View
                    {...props.panHandlers}
                    style={[styles.animatedContainer, props.panLayout]}
                >
                    <PetData onPress={props.onDetailsPress} {...props} />
                </Animated.View>
                <View onLayout={props.setRightDropZoneValues} style={{ width: 30 }} />
            </View>
            <View style={styles.buttonStack}>
                <DeclineButton onPress={props.onNextPress} />
                <AcceptButton onPress={props.onNextPress} />
            </View>
        </View>
    );
}

interface IIconButtonProps {
    onPress: () => void;
    source: any;
}

const IconButton = (props: IIconButtonProps) => (
    <Button onPress={props.onPress}>
        <Image style={styles.icon} source={props.source} />
    </Button>
);

const AcceptButton =
    (props: { onPress: () => void }) => <IconButton source={acceptIcon} {...props} />;

const DeclineButton = (props: { onPress: () => void }) => <IconButton source={declineIcon} {...props} />;