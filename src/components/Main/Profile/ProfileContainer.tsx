import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../../state/state';
import { ActionType } from '../../../state/actionsTypes';
import Profile from './Profile';

interface IProfileContainerProps {
    petType: 'dog' | 'cat';
    postalCode: string;
    dispatch: Function;
}

class ProfileContainer extends Component<IProfileContainerProps, {}> {

    handleChangePostalCode(postalCode: string) {
        this.props.dispatch({ type: ActionType.change_postal_code, postalCode });
    }

    handleChangePetType = () => {
        this.props.dispatch({ type: ActionType.switch_pet_type });
    }

    render() {
        return (
            <Profile
                onChangePostalCode={this.handleChangePostalCode.bind(this)}
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