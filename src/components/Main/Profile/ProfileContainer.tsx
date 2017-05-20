import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../../state/state';
import { actionTypes } from '../../../state/actionTypes';
import Profile from './Profile';

interface IProfileContainerProps {
    petType: 'dog' | 'cat';
    postalCode: string;
    dispatch: Function;
}

class ProfileContainer extends Component<IProfileContainerProps, {}> {
    handleChangePostalCode = (postalCode: string) => {
        this.props.dispatch({ type: actionTypes.change_postal_code, postalCode });
    }

    handleChangePetType = () => {
        this.props.dispatch({ type: actionTypes.switch_pet_type });
    }

    render() {
        return (
            <Profile
                onChangePostalCode={this.handleChangePostalCode}
                onChangePetType={this.handleChangePetType}
                postalCode={this.props.postalCode}
                petType={this.props.petType}
            />
        );
    }
}

const mapStateToProps = ({ profile }: IAppState) =>
    ({ postalCode: profile.postalCode, petType: profile.petType });

export default connect(mapStateToProps)(ProfileContainer);