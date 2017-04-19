import React from 'react';
import TextInput, { ICommonTextInputProps } from './TextInput';

function EmailInput(props: ICommonTextInputProps) {
    return <TextInput
        placeholder='Email Address'
        keyboardType='email-address'
        autoCapitalize='none'
        autoCorrect={false} {...props}
    />;
}

export default EmailInput;
