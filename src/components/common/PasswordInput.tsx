import React from 'react';
import TextInput, { ICommonTextInputProps } from './TextInput';

function PasswordInput(props: ICommonTextInputProps) {
    return <TextInput
        placeholder='Password'
        secureTextEntry
        autoCapitalize='none'
        autoCorrect={false} {...props}
    />;
}

export default PasswordInput;
