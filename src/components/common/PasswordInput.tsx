import React from 'react';
import { TextInputProperties } from 'react-native';
import { rnComponentProps } from '../../config/constants';
import TextInput from './TextInput';

function PasswordInput(props: TextInputProperties) {
    return (
        <TextInput
            placeholder="Password"
            secureTextEntry
            autoCapitalize={rnComponentProps.textInput.autoCapitalize.NONE}
            autoCorrect={false}
            {...props}
        />
    );
}

export default PasswordInput;
