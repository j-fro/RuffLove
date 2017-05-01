import React from 'react';
import { TextInputProperties } from 'react-native';
import TextInput from './TextInput';

function PasswordInput(props: TextInputProperties) {
    return <TextInput
        placeholder='Password'
        secureTextEntry
        autoCapitalize='none'
        autoCorrect={false} {...props}
    />;
}

export default PasswordInput;
