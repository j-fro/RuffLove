import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../../state/state';
import { ActionType } from '../../../state/actionTypes';
import { authActions } from '../../../state/actions';
import Profile from './Profile';

interface IProfileContainerProps {
    petType: 'dog' | 'cat';
    postalCode: string;
    dispatch: Function;
}

class ProfileContainer extends Component<IProfileContainerProps, {}> {
    handleChangePostalCode(postalCode: string) {
        this.props.dispatch({ type: ActionType.ChangePostalCode, postalCode });
    }

    handleChangePetType() {
        this.props.dispatch({ type: ActionType.SwitchPetType });
    }

    handleLogoutPress() {
        this.props.dispatch(authActions.logout());
    }

    render() {
        return (
            <Profile
                onChangePostalCode={code => this.handleChangePostalCode(code)}
                onChangePetType={() => this.handleChangePetType()}
                onLogoutPress={() => this.handleLogoutPress()}
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

export default connect(mapStateToProps)(ProfileContainer);
