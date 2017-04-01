import { StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import { secondaryBackground } from '../../../../config/colors';
import parentStyles from '../styles';

interface IStyle {
    portrait: ImageStyle;
    container: ViewStyle;
    shadowBox: ViewStyle;
}

const styles = StyleSheet.create<IStyle>({
    container: {
        flex: 1,
        alignSelf: 'stretch',
    },
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
        }
    },
    portrait: {
        flex: 1,
        alignSelf: 'stretch',
        borderRadius: 10,
    },
});

export default {
    ...parentStyles,
    ...styles
};