import React, { Component, ComponentState } from 'react';
import { View, ViewStatic, TextInputStatic, TextInputProperties, Switch } from 'react-native';
import { TextInput } from '../../common';
import styles from './styles';

interface IProfileProps {
    postalRef: (
        ((instance: Component<TextInputProperties, ComponentState>) => any)
        & ((instance: ViewStatic & TextInputStatic) => any)
    );
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
                getRef={props.postalRef}
            />
            <Switch onValueChange={props.onChangePetType} value={props.petType === 'dog'} />
        </View>
    );
}

export default Profile;