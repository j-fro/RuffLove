import React from 'react';
import { TextInputProperties } from 'react-native';
import { rnComponentProps } from '../../config/constants';
import TextInput from './TextInput';

function EmailInput(props: TextInputProperties) {
    return (
        <TextInput
            placeholder="Email Address"
            keyboardType={rnComponentProps.textInput.keyboardType.EMAIL_ADDRESS}
            autoCapitalize={rnComponentProps.textInput.autoCapitalize.NONE}
            autoCorrect={false}
            {...props}
        />
    );
}

export default EmailInput;
