import { StyleSheet, FlexAlignType, FlexJustifyType, ViewStyle } from 'react-native';
import parentStyles from '../styles';

interface IStyle {
    container: ViewStyle
    shadowBox: ViewStyle
}

const styles = StyleSheet.create<IStyle>({
    container: {
        flex: 1, alignSelf: 'stretch'
    },
    shadowBox: {
        alignSelf: 'stretch',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#fff',
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 5,
            height: 5
        }
    }
});

export default {
    ...parentStyles,
    ...styles
};