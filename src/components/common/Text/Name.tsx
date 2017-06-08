import React, { ReactChild } from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { textColor } from '../../../config/colors';

const style = StyleSheet.create<{ name: TextStyle }>({
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: textColor
    }
});

interface NameTextProps {
    children: string | ReactChild | ReactChild[];
    style?: TextStyle;
}

function Name(props: NameTextProps) {
    return <Text style={[style.name, props.style]}>{props.children}</Text>;
}

export default Name;