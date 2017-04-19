import React, { Component, Props } from 'react';
import { TouchableHighlight, View } from 'react-native';
import styles from './styles';

export interface IButtonProps extends Props<Button> {
    onPress?: () => void;
}

export default class Button extends Component<IButtonProps, {}> {
    render() {
        return (
            <TouchableHighlight style={styles.button} onPress={this.props.onPress}>
                <View>{this.props.children}</View>
            </TouchableHighlight>
        );
    }
}