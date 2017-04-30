import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux';
import { EmailInput, PasswordInput, Button } from '../common';
import { ActionType } from '../../state/actionsTypes';
import { IAppState } from '../../state/state';
import { register } from '../../state/actions';
import styles from './styles';

interface ILoginProps {
    dispatch: Function;
    email: string;
    password: string;
}

function Login({ dispatch, email, password }: ILoginProps) {


    return (
        <View style={styles.container}>
            <EmailInput
                onChangeText={email => dispatch({ type: ActionType.change_email, email })}
            />
            <PasswordInput
                onChangeText={password => dispatch({ type: ActionType.change_password, password })}
            />
            <Button><Text>Login</Text></Button>
            <TouchableHighlight onPress={() => dispatch(register(email, password))}>
                <Text>Login</Text>
            </TouchableHighlight>
        </View>
    );
}

export default connect(({ auth }: IAppState) => ({ email: auth.email, password: auth.password }))(Login);