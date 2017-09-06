import React from 'react';
import {
    View,
    Image,
    Animated,
    GestureResponderHandlers,
    LayoutChangeEvent,
    ViewStyle
} from 'react-native';
import PetData from './PetData';
import { Pet } from '../../../../state/Pet';
import { Button } from '../../../common/';
import { acceptIcon, declineIcon } from '../../../../config/images';
import styles from './styles';

interface Props {
    isFetching: boolean;
    petContainerOpacity: Animated.Value;
    pet: Pet;
    panHandlers: GestureResponderHandlers;
    panLayout: ViewStyle;
    onLikePress: () => void;
    onDislikePress: () => void;
    onDetailsPress: () => void;
    onLayout: (e: LayoutChangeEvent) => void;
}

export default function PetSwiper(props: Props) {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <Animated.View
                    {...props.panHandlers}
                    onLayout={props.onLayout}
                    style={[
                        styles.animatedContainer,
                        props.panLayout,
                        { opacity: props.petContainerOpacity }
                    ]}
                >
                    <PetData
                        onPress={props.onDetailsPress}
                        isFetching={props.isFetching}
                        pet={props.pet}
                    />
                </Animated.View>
            </View>
            <View style={styles.buttonStack}>
                <DeclineButton onPress={props.onDislikePress} />
                <AcceptButton onPress={props.onLikePress} />
            </View>
        </View>
    );
}

interface IIconButtonProps {
    onPress: () => void;
    source: any;
}

const IconButton = (props: IIconButtonProps) =>
    <Button onPress={props.onPress}>
        <Image style={styles.icon} source={props.source} />
    </Button>;

const AcceptButton = (props: { onPress: () => void }) =>
    <IconButton source={acceptIcon} {...props} />;

const DeclineButton = (props: { onPress: () => void }) =>
    <IconButton source={declineIcon} {...props} />;
