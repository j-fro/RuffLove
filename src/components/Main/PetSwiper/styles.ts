import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { secondaryBackground, textColor } from '../../../config/colors';
import parentStyles from '../styles';

interface IStyle {

    name: TextStyle;
    icon: ViewStyle;
    buttonStack: ViewStyle;
    button: ViewStyle;
}

const styles = StyleSheet.create<IStyle>({
    name: {
        color: textColor,
        paddingTop: 15,
        paddingBottom: 5,
        alignSelf: 'stretch',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 18
    },
    icon: {
        flexDirection: 'column',
        width: 80,
        height: 80
    },
    buttonStack: {
        flexDirection: 'row',
        justifyContent: 'center'
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
        }
    }
});

export default { ...parentStyles, ...styles };
