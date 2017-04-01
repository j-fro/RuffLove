import React, { Component } from 'react';
import { connect } from 'react-redux';
import PetDetails from './PetDetails';
import { IAppState } from '../../../state/reducers';
import { Pet } from '../../../state/Pet';

interface IPetDetailsContainerProps {
    pet: Pet;
}

interface IPetDetailsContainerState { }

class PetDetailsContainer extends Component<IPetDetailsContainerProps, IPetDetailsContainerState> {
    static navigationOptions = {
        title: 'Details'
    };

    render() {
        return <PetDetails {...this.props} />;
    }
}

const mapStateToProps = (state: IAppState) => ({ pet: state.currentPet });

export default connect(mapStateToProps)(PetDetailsContainer);