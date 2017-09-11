import React, { Component } from 'react';
import {
    Animated,
    PanResponder,
    PanResponderInstance,
    PanResponderGestureState,
    LayoutChangeEvent,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';
import { Pet } from '../../../../state/Pet';
import { IAppState } from '../../../../state/state';
import { fetchPets } from '../../../../state/actions';
import { addNewFavorite } from '../../../../state/actions';
import { ActionType } from '../../../../state/actionTypes';
import { homeRoutes } from '../../../../config/routes';
import PetSwiper from './PetSwiper';

type Props = NavigationScreenProps<void> & {
    userID: string;
    pet: Pet;
    isFetching: boolean;
    dispatch: Function;
    offset: number;
    postalCode: string;
};

type State = {
    petContainerPan: Animated.ValueXY;
    petConatinerOpacity: Animated.Value;
    center: { x: number; y: number };
};

class PetSwiperContainer extends Component<Props, State> {
    state: State = {
        petContainerPan: new Animated.ValueXY(),
        petConatinerOpacity: new Animated.Value(1),
        center: { x: 0, y: 0 }
    };

    panResponder: PanResponderInstance = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([
            {},
            {
                dx: this.state.petContainerPan.x,
                dy: this.state.petContainerPan.y
            }
        ]),
        onPanResponderRelease: (_, gesture) => {
            if (isLikeGesture(gesture)) {
                this.handleLikePress();
                this.launchAndResetPet(gesture);
            } else if (isDislikeGesture(gesture)) {
                this.handleDislikePress();
                this.launchAndResetPet(gesture);
            } else {
                Animated.spring(this.state.petContainerPan, { toValue: { x: 0, y: 0 } }).start();
            }
        }
    });

    setPetFrameCenter(event: LayoutChangeEvent) {
        if (this.state.center.x === 0) {
            console.log('onlayout');
            const { x, y } = event.nativeEvent.layout;
            this.setState({ center: { x, y } });
        }
    }

    launchAndResetPet(gesture: PanResponderGestureState) {
        const { width } = Dimensions.get('window');
        console.log('Width', width * gesture.vx);
        console.log('Height', width * gesture.vy);
        const speed = getSwipeSpeed(gesture);
        Animated.timing(this.state.petContainerPan, {
            toValue: { x: width * gesture.vx, y: width * gesture.vy },
            duration: 500 / speed
        }).start(() => this.resetPetData());
    }

    resetPetData() {
        this.state.petContainerPan.setValue({ x: 0, y: 0 });
        this.state.petConatinerOpacity.setValue(0);
        Animated.timing(this.state.petConatinerOpacity, { toValue: 1, duration: 500 }).start();
    }

    handleLikePress() {
        console.log('LIKE');
        const { pet, userID } = this.props;
        addNewFavorite(userID, pet.petfinderID);
        this.advancePet();
    }

    handleDislikePress() {
        console.log('DISLIKE');
        this.advancePet();
    }

    advancePet() {
        const { dispatch } = this.props;
        dispatch({ type: ActionType.AdvancePet });
        dispatch(fetchPets());
    }

    handleDetailsPress() {
        const { navigate } = this.props.navigation;
        navigate(homeRoutes.details);
    }

    render() {
        return (
            <PetSwiper
                panHandlers={this.panResponder.panHandlers}
                panLayout={this.state.petContainerPan.getLayout()}
                pet={this.props.pet}
                petContainerOpacity={this.state.petConatinerOpacity}
                isFetching={this.props.isFetching}
                onLayout={e => this.setPetFrameCenter(e)}
                onLikePress={() => this.handleLikePress()}
                onDislikePress={() => this.handleDislikePress()}
                onDetailsPress={() => this.handleDetailsPress()}
            />
        );
    }
}

function mapStateToProps({ pets, profile, auth }: IAppState) {
    return {
        userID: auth.userID,
        pet: pets.petQueue[0],
        isFetching: pets.isFetching,
        offset: pets.offset,
        postalCode: profile.postalCode
    };
}

export default connect(mapStateToProps)(PetSwiperContainer);

function getSwipeSpeed(gesture: PanResponderGestureState) {
    const { vx, vy } = gesture;
    return Math.sqrt(vx * vx + vy * vy);
}

function isSwipeGesture(gesture: PanResponderGestureState) {
    return getSwipeSpeed(gesture) > 0.7;
}

function isLikeGesture(gesture: PanResponderGestureState) {
    return isSwipeGesture(gesture) && gesture.dx > 100;
}

function isDislikeGesture(gesture: PanResponderGestureState) {
    return isSwipeGesture(gesture) && gesture.dx < -100;
}
