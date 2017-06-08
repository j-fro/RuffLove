import React, { ReactChild } from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { textColor } from '../../../config/colors';

const style = StyleSheet.create<{ description: TextStyle }>({
    description: { color: textColor }
});

interface DescriptionTextProps {
    children: string | ReactChild | ReactChild[];
    style?: TextStyle;
}

function Description(props: DescriptionTextProps) {
    return <Text style={[style.description, props.style]}>{props.children}</Text>;
}

export default Description;