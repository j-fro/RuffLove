import React, { Component } from 'react';
import {
    Animated,
    PanResponder,
    PanResponderInstance,
    PanResponderGestureState,
    LayoutChangeEvent,
    LayoutRectangle
} from 'react-native';
import { connect } from 'react-redux';
import { IAppState } from '../../../../state/state';
import { fetchPets } from '../../../../state/actions';
import { ActionType } from '../../../../state/actionsTypes';
import { homeRoutes } from '../../../../config/routes';
import { Pet } from '../../../../state/Pet';
import PetSwiper from './PetSwiper';

enum DropSide {
    Left,
    Right,
    None,
}

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
    pan: Animated.ValueXY;
    leftDropZoneValues: LayoutRectangle;
    rightDropZoneValues: LayoutRectangle;
}

class PetSwiperContainer extends Component<IPetSwiperContainerProps, IPetSwiperContainerState> {
    panResponder: PanResponderInstance;

    constructor(props: IPetSwiperContainerProps, context: any) {
        super(props, context);

        this.state = {
            pan: new Animated.ValueXY(),
            leftDropZoneValues: null,
            rightDropZoneValues: null
        };

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, {
                dx: this.state.pan.x,
                dy: this.state.pan.y
            }]),
            onPanResponderRelease: (_, gesture) => {
                if (this.isDropZone(gesture) !== DropSide.None) {
                    this.handleNextPress();
                }
                Animated.spring(this.state.pan, { toValue: { x: 0, y: 0 } }).start();
            }
        });
    }

    setLeftDropZoneValues = (event: LayoutChangeEvent) => {
        this.setState({ leftDropZoneValues: event.nativeEvent.layout })
    }

    setRightDropZoneValues = (event: LayoutChangeEvent) => {
        this.setState({ rightDropZoneValues: event.nativeEvent.layout })
    }

    isDropZone = (gesture: PanResponderGestureState): DropSide => {
        const { leftDropZoneValues, rightDropZoneValues } = this.state;
        if (gesture.moveX < leftDropZoneValues.x + leftDropZoneValues.width) {
            return DropSide.Left;
        } else if (gesture.moveX > rightDropZoneValues.x) {
            return DropSide.Right;
        }
        return DropSide.None;
    }

    handleNextPress() {
        this.props.dispatch({ type: ActionType.advance_pet });
        this.props.dispatch(fetchPets());
    }

    handleDetailsPress() {
        const { navigate } = this.props.navigation;
        navigate(homeRoutes.details);
    }

    render() {
        return (
            <PetSwiper
                panHandlers={this.panResponder.panHandlers}
                panLayout={this.state.pan.getLayout()}
                setLeftDropZoneValues={this.setLeftDropZoneValues}
                setRightDropZoneValues={this.setRightDropZoneValues}
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