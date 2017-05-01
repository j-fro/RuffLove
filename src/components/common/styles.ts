import { StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import { secondaryBackground } from '../../config/colors';
import styles from '../styles';

interface IStyle {
    portrait: ImageStyle;
    shadowBox: ViewStyle;
}

export default {
    ...styles,
    ...StyleSheet.create<IStyle>({
        shadowBox: {
            alignSelf: 'stretch',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            padding: 10,
            backgroundColor: secondaryBackground,
            shadowOpacity: 0.5,
            shadowOffset: {
                width: 5,
                height: 5
            },
            elevation: 5
        },
        portrait: {
            flex: 1,
            alignSelf: 'stretch',
            borderRadius: 10,
        },
    })
};