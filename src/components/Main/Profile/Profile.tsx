import React from 'react';
import { View, Switch } from 'react-native';
import { TextInput } from '../../common';
import styles from './styles';

interface IProfileProps {
    postalCode: string;
    onChangePostalCode: (text: string) => void;
    onChangePetType: () => void;
    petType: 'dog' | 'cat';
}

function Profile(props: IProfileProps) {
    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Postal Code'
                onChangeText={props.onChangePostalCode}
                value={props.postalCode}
            />
            <Switch onValueChange={props.onChangePetType} value={props.petType === 'dog'} />
        </View>
    );
}

export default Profile;