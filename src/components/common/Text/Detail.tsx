import React, { ReactChild } from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { textColor } from '../../../config/colors';

const style = StyleSheet.create<{ detail: TextStyle }>({
    detail: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: textColor
    }
});

interface DetailTextProps {
    children: string | ReactChild | ReactChild[];
    style?: TextStyle;
}

function Detail(props: DetailTextProps) {
    return (
        <Text style={[style.detail, props.style] as TextStyle}>
            {props.children}
        </Text>
    );
}

export default Detail;
