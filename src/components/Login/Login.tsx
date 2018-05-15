import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { EmailInput, PasswordInput, Button } from '../common';
import { authActions } from '../../state/actions';
import { State, authSelectors } from '../../state/reducers/index';
import styles from './styles';
import { Action } from 'redux';

interface ILoginProps {
    email: string;
    password: string;
    changeEmail(email: string): Action;
    changePassword(password: string): Action;
    emailLogin(e: string, p: string): Action;
    register(e: string, p: string): Action;
}

function Login(props: ILoginProps) {
    return (
        <View style={styles.container}>
            <EmailInput onChangeText={props.changeEmail} value={props.email} />
            <PasswordInput onChangeText={props.changePassword} value={props.password} />
            <Button onPress={() => props.emailLogin(props.email, props.password)}>
                <Text>Login</Text>
            </Button>
            <Button onPress={() => props.register(props.email, props.password)}>
                <Text>Register</Text>
            </Button>
        </View>
    );
}

function mapStateToProps(state: State) {
    return {
        email: authSelectors.getEmail(state),
        password: authSelectors.getPassword(state)
    };
}

const mapDispatchToProps = {
    changeEmail: authActions.changeEmail,
    changePassword: authActions.changePassword,
    emailLogin: authActions.emailLogin,
    register: authActions.register
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
