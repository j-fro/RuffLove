import React from 'react';
import {
    View,
    TouchableHighlight,
    Text,
    Image,
    ImageURISource
} from 'react-native';
import styles from './styles';

interface IPortraitButtonProps {
    onPress: () => void;
    source: ImageURISource;
    label?: string;
    height?: number;
    width?: number;
}

const PortraitButton = ({ source, height, width, onPress, label }: IPortraitButtonProps) => (
    <TouchableHighlight onPress={onPress} style={styles.shadowBox}>
        <View style={styles.portraitContainer}>
            <Image source={source} style={[{ height, width }, styles.portrait]} />
            <Text style={styles.label}>{label}</Text>
        </View>
    </TouchableHighlight>
);

export default PortraitButton;