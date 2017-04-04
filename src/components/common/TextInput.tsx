import React, { Component, ComponentState } from 'react';
import { View, TextInput, TextInputProperties, ViewStatic, TextInputStatic } from 'react-native';
import { secondaryBackground } from '../../config/colors';

interface ICommonTextInputProps extends TextInputProperties {
    getRef: (
        ((instance: Component<TextInputProperties, ComponentState>) => any)
        & ((instance: ViewStatic & TextInputStatic) => any)
    );
}

function CommonTextInput(props: ICommonTextInputProps) {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: secondaryBackground,
            borderRadius: 10,
            shadowOpacity: 0.5,
            shadowOffset: {
                width: 5,
                height: 5
            }
        }}>
            <TextInput
                ref={props.getRef}
                {...props}
                style={{ flex: 1, margin: 10, lineHeight: 24, height: 24 }}
            />
        </View>
    )
}

export default CommonTextInput;