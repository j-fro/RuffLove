import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../../state/reducers';
import { actions, fetchPet } from '../../../state/actions';
import { MainRoute } from '../../../config/routes';
import PetSwiper from './PetSwiper';
import { Pet } from '../../../state/Pet';

interface IPetSwiperContainerProps {
    pet: Pet;
    isFetching: boolean;
    dispatch: Function;
    offset: number;
    navigation: {
        navigate: Function,
    };
}

interface IPetSwiperContainerState {
    pet: Pet;
    isFetching: boolean;
    offset: number;
}

class PetSwiperContainer extends Component<IPetSwiperContainerProps, IPetSwiperContainerState> {
    handleNextPress() {
        this.props.dispatch({ type: actions.advance_pet });
        this.props.dispatch(fetchPet(this.props.offset, '55401'));
    }

    handleDetailsPress() {
        const { navigate } = this.props.navigation;
        navigate(MainRoute[MainRoute.Details]);
    }

    render() {
        return <PetSwiper
            onNextPress={this.handleNextPress.bind(this)}
            onDetailsPress={this.handleDetailsPress.bind(this)}
            {...this.props}
        />;
    }
}

function mapStateToProps(state: IAppState) {
    return {
        pet: state.currentPet,
        isFetching: state.isFetching,
        offset: state.offset
    };
}

export default connect(mapStateToProps)(PetSwiperContainer);