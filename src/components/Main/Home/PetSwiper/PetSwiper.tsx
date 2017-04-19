import React from 'react';
import { View, Image } from 'react-native';
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
}

export default function PetSwiper(props: IPetSwiperProps) {
    return (
        <View style={styles.container}>
            <PetData onPress={props.onDetailsPress} {...props} />
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