import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from 'react-native';
import parentStyles from '../styles';

interface IStyle {
    container: ViewStyle;
    portrait: ImageStyle;
    name: TextStyle;
    icon: ViewStyle;
    buttonStack: ViewStyle;
    button: ViewStyle;
}

const styles = StyleSheet.create<IStyle>({
    portrait: {
        flex: 1,
        alignSelf: 'stretch',
        borderRadius: 10
    },
    name: {
        paddingTop: 15,
        paddingBottom: 5,
        alignSelf: 'stretch',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 18
    },
    container: {
        alignSelf: 'stretch',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
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
        backgroundColor: '#fff',
        shadowOffset: {
            width: 5,
            height: 5
        }
    }
});

export default { ...parentStyles, ...styles };
