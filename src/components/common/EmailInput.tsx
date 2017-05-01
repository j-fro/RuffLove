import React from 'react';
import { TextInputProperties } from 'react-native';
import TextInput from './TextInput';

function EmailInput(props: TextInputProperties) {
    return <TextInput
        placeholder='Email Address'
        keyboardType='email-address'
        autoCapitalize='none'
        autoCorrect={false} {...props}
    />;
}

export default EmailInput;
