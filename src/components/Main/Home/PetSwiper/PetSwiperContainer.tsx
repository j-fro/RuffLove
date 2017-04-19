import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../../../state/state';
import { fetchPets } from '../../../../state/actions';
import { ActionType } from '../../../../state/actionsTypes';
import { HomeRoute } from '../../../../config/routes';
import { Pet } from '../../../../state/Pet';
import PetSwiper from './PetSwiper';

interface IPetSwiperContainerProps {
    pet: Pet;
    isFetching: boolean;
    dispatch: Function;
    offset: number;
    postalCode: string;
    navigation: {
        navigate: Function,
    };
}

interface IPetSwiperContainerState {
    pet: Pet;
    isFetching: boolean;
    offset: number;
    postalCode: string;
}

class PetSwiperContainer extends Component<IPetSwiperContainerProps, IPetSwiperContainerState> {
    handleNextPress() {
        this.props.dispatch({ type: ActionType.advance_pet });
        this.props.dispatch(fetchPets());
    }

    handleDetailsPress() {
        const { navigate } = this.props.navigation;
        navigate(HomeRoute[HomeRoute.Details]);
    }

    render() {
        return (
            <PetSwiper
                onNextPress={this.handleNextPress.bind(this)}
                onDetailsPress={this.handleDetailsPress.bind(this)}
                {...this.props}
            />
        );
    }
}

function mapStateToProps({ pets, profile }: IAppState) {
    return {
        pet: pets.currentPet,
        isFetching: pets.isFetching,
        offset: pets.offset,
        postalCode: profile.postalCode
    };
}

export default connect(mapStateToProps)(PetSwiperContainer);