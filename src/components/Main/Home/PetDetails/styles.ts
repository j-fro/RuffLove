import { StyleSheet, ViewStyle } from 'react-native';
import { primaryColor, secondaryBackground } from '../../../../config/colors';
import parentStyles from '../styles';

interface IStyle {
    container: ViewStyle;
    scrollContainer: ViewStyle;
    detailContainer: ViewStyle;
}

const styles = StyleSheet.create<IStyle>({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        backgroundColor: primaryColor
    },
    scrollContainer: { flex: 1, padding: 10 },
    detailContainer: {
        backgroundColor: secondaryBackground,
        alignItems: 'center',
        flex: 1,
        marginTop: 10,
        marginBottom: 30,
        padding: 10,
        borderRadius: 3,
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 5,
            height: 5
        },
        elevation: 5
    }
});

export default {
    ...parentStyles,
    ...styles
};
