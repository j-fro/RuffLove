import React from 'react';
import { View, TouchableHighlight, Text, Image, ImageStyle, ImageURISource } from 'react-native';
import styles from './styles';

interface IPortraitButtonProps {
    onPress: () => void;
    onLongPress?: () => void;
    source: ImageURISource;
    label?: string;
    height?: number;
    width?: number;
}

const PortraitButton = (props: IPortraitButtonProps) =>
    <TouchableHighlight
        onPress={props.onPress}
        onLongPress={props.onLongPress}
        style={styles.shadowBox}
    >
        <View style={styles.portraitContainer}>
            <Image
                source={props.source}
                style={
                    [{ height: props.height, width: props.width }, styles.portrait] as ImageStyle
                }
            />
            <Text style={styles.label}>
                {props.label}
            </Text>
        </View>
    </TouchableHighlight>;

export default PortraitButton;
