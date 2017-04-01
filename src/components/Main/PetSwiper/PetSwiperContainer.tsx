import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPet } from '../../../state/actions';
import PetSwiper from './PetSwiper';
import { Pet } from '../../../state/Pet';

interface IPetSwiperContainerProps {
    pet: Pet;
    isFetching: boolean;
    dispatch: Function;
    offset: number;
}

interface IPetSwiperContainerState {
    pet: Pet;
    isFetching: boolean;
    offset: number;
}

class PetSwiperContainer extends Component<IPetSwiperContainerProps, IPetSwiperContainerState> {
    constructor(props: IPetSwiperContainerProps, context: any) {
        super(props, context);

        this.state = { isFetching: true, pet: new Pet(), offset: 0 };
    }

    componentDidMount() {
        this.props.dispatch(fetchPet(this.props.offset, '55401'));
    }

    handleNextPress() {
        this.props.dispatch(fetchPet(this.props.offset, '55401'));
    }

    render() {
        return <PetSwiper onNextPress={this.handleNextPress.bind(this)} {...this.props} />;
    }
}

function mapStateToProps(state: IPetSwiperContainerState) {
    return {
        pet: state.pet,
        isFetching: state.isFetching,
        offset: state.offset
    };
}

export default connect(mapStateToProps)(PetSwiperContainer);