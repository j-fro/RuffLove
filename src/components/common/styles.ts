import { StyleSheet, ViewStyle, ImageStyle, TextStyle } from 'react-native';
import { secondaryBackground, textColor } from '../../config/colors';
import styles from '../styles';

interface IStyle {
    portrait: ImageStyle;
    shadowBox: ViewStyle;
    label: TextStyle;
    portraitContainer: ViewStyle;
}

export default {
    ...styles,
    ...StyleSheet.create<IStyle>({
        shadowBox: {
            alignSelf: 'stretch',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 3,
            padding: 10,
            backgroundColor: secondaryBackground,
            shadowOpacity: 0.5,
            shadowOffset: {
                width: 5,
                height: 5
            },
            elevation: 5
        },
        label: {
            color: textColor,
            paddingTop: 15,
            paddingBottom: 5,
            alignSelf: 'stretch',
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 18
        },
        portrait: {
            flex: 1,
            alignSelf: 'stretch',
            borderRadius: 3,
        },
        portraitContainer: {
            flex: 1,
            alignSelf: 'stretch'
        }
    })
};