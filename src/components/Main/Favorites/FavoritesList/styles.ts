import { StyleSheet, ViewStyle, Dimensions } from 'react-native';
import styles from '../styles';

const { width } = Dimensions.get('window');

interface Styles {
    contentContainer: ViewStyle;
    cellContainer: ViewStyle;
}

export default {
    ...styles,
    ...StyleSheet.create<Styles>({
        contentContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap'
        },
        cellContainer: {
            padding: 5,
            width: width / 2,
            height: width / 2
        }
    })
}