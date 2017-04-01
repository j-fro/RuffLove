import { StyleSheet, ViewStyle } from 'react-native';
import { primaryColor } from '../config/colors';

interface IStyle {
    container: ViewStyle;
}

export default StyleSheet.create<IStyle>({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: primaryColor
    }
});