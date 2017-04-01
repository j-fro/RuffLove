import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../../state/reducers';
import { fetchPet } from '../../../state/actions';
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