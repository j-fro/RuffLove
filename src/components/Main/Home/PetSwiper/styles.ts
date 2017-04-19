import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { textColor } from '../../../../config/colors';
import parentStyles from '../styles';

interface IStyle {
    name: TextStyle;
    icon: ViewStyle;
    buttonStack: ViewStyle;
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

});

export default { ...parentStyles, ...styles };
