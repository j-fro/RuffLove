import React from 'react';
import { View, TextInput, TextInputProperties } from 'react-native';
import { secondaryBackground } from '../../config/colors';

function CommonTextInput(props: TextInputProperties) {
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
                {...props}
                style={{ flex: 1, margin: 10, lineHeight: 24, height: 24 }}
            />
        </View>
    );
}

export default CommonTextInput;