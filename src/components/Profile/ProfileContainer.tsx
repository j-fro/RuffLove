import React, { Component } from 'react';
import { ViewStatic, TextInputStatic } from 'react-native';
import { connect } from 'react-redux';
import { IAppState } from '../../state/reducers';
import { actions } from '../../state/actions';
import Profile from './Profile';

interface IProfileContainerProps {
    postalCode: string;
    dispatch: Function;
}

class ProfileContainer extends Component<IProfileContainerProps, {}> {

    postal?: ViewStatic & TextInputStatic;

    componentDidMount() {
        this.postal.setNativeProps({ text: this.props.postalCode });
    }

    postalRef(component: ViewStatic & TextInputStatic) {
        this.postal = component;
    }

    handleChangePostalCode(postalCode: string) {
        this.props.dispatch({ type: actions.change_postal_code, postalCode });
    }

    render() {
        return (
            <Profile
                onChangePostalCode={this.handleChangePostalCode.bind(this)}
                postalRef={this.postalRef.bind(this)}
            />
        );
    }
}

export default connect((state: IAppState) => ({ postalCode: state.postalCode }))(ProfileContainer);