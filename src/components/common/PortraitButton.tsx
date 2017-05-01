import React from 'react';
import {
    TouchableHighlight,
    Image,
    ImageURISource
} from 'react-native';
import styles from './styles';

interface IPortraitButtonProps {
    onPress: () => void;
    source: ImageURISource;
    height?: number;
    width?: number;
}

const PortraitButton = ({ source, height, width, onPress }: IPortraitButtonProps) => (
    <TouchableHighlight onPress={onPress} style={styles.shadowBox}>
        <Image source={source} style={[{ height, width }, styles.portrait]} />
    </TouchableHighlight>
);

export default PortraitButton;