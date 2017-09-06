import { StyleSheet, ViewStyle } from 'react-native';
import { PRIMARY, secondaryBackground } from '../config/colors';

interface IStyle {
    container: ViewStyle;
    button: ViewStyle;
}

export default StyleSheet.create<IStyle>({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: PRIMARY
    },
    button: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        width: 80,
        borderRadius: 40,
        margin: 15,
        shadowOpacity: 0.5,

        backgroundColor: secondaryBackground,
        shadowOffset: {
            width: 5,
            height: 5
        },
        elevation: 5
    }
});
