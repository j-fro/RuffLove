import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../../state/state';
import { authActions, profileActions } from '../../../state/actions';
import Profile from './Profile';
import { Action } from 'redux';

interface IProfileContainerProps {
    petType: 'dog' | 'cat';
    postalCode: string;
    dispatch: Function;
    changePostalCode: (code: string) => Action;
    togglePreference: () => Action;
    logout: () => () => Promise<void>;
}

class ProfileContainer extends Component<IProfileContainerProps, {}> {
    render() {
        return (
            <Profile
                onChangePostalCode={this.props.changePostalCode}
                onChangePetType={this.props.togglePreference}
                onLogoutPress={this.props.logout}
                postalCode={this.props.postalCode}
                petType={this.props.petType}
            />
        );
    }
}

const mapStateToProps = ({ profile }: IAppState) => ({
    postalCode: profile.postalCode,
    petType: profile.petType
});

function mapDispatchToProps() {
    return {
        changePostalCode: profileActions.changePostalCode,
        togglePreference: profileActions.togglePreference,
        logout: authActions.logout
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
