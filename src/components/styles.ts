import { StyleSheet, ViewStyle } from 'react-native';

interface IStyle {
    container: ViewStyle;
}

export default StyleSheet.create<IStyle>({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});