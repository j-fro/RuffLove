import { StyleSheet, ViewStyle, ImageStyle, TextStyle, Dimensions } from 'react-native';
import { primaryColor, secondaryBackground, textColor } from '../../../../config/colors';
import parentStyles from '../styles';

const { width } = Dimensions.get('window');

interface IStyle {
    container: ViewStyle;
    wrapper: ViewStyle;
    scrollContainer: ViewStyle;
    detailContainer: ViewStyle;
    name: TextStyle;
    detail: TextStyle;
    description: TextStyle;
    image: ImageStyle;
    slide: ViewStyle;
}

const styles = StyleSheet.create<IStyle>({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        backgroundColor: primaryColor
    },
    wrapper: { height: width, backgroundColor: primaryColor, borderRadius: 40 },
    scrollContainer: { flex: 1, padding: 10 },
    detailContainer: {
        backgroundColor: secondaryBackground,
        alignItems: 'center',
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 40,
    },
    name: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: textColor },
    detail: { fontWeight: 'bold', marginBottom: 5, color: textColor },
    description: { marginBottom: 30, color: textColor },
    image: { flex: 1 },
    slide: { flex: 1, justifyContent: 'center', alignItems: 'stretch' },
});

export default {
    ...parentStyles,
    ...styles
};