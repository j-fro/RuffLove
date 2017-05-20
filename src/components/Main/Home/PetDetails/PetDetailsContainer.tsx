import React, { Component } from 'react';
import { connect } from 'react-redux';
import PetDetails from './PetDetails';
import { IAppState } from '../../../../state/state';
import { Pet } from '../../../../state/Pet';

interface IPetDetailsContainerProps {
    pet: Pet;
}

interface IPetDetailsContainerState { }

class PetDetailsContainer extends Component<IPetDetailsContainerProps, IPetDetailsContainerState> {
    static navigationOptions = {
        title: 'Details'
    };

    render() {
        return <PetDetails pet={this.props.pet} />;
    }
}

const mapStateToProps = ({ pets }: IAppState) => ({ pet: pets.currentPet });

export default connect(mapStateToProps)(PetDetailsContainer);