import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  GestureHandlerRootView, // Ensure this is imported
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
  runOnJS,
  withTiming,
  withRepeat,
  cancelAnimation,
} from 'react-native-reanimated';

const {width} = Dimensions.get('window');

const BUTTON_HEIGHT = 50;
const BUTTON_WIDTH = width - 40;
const BUTTON_PADDING = 5;
const SLIDER_SIZE = BUTTON_HEIGHT - 2 * BUTTON_PADDING;
const SLIDE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SLIDER_SIZE;

interface SlideToConfirmProps {
  onConfirm: () => void;
}

const Slider: React.FC<SlideToConfirmProps> = ({onConfirm}) => {
  const translateX = useSharedValue(0);
  const [confirmed, setConfirmed] = useState(false);

  // Animation ke liye swipe hint
  useEffect(() => {
    const startHintAnimation = () => {
      translateX.value = withRepeat(
        withTiming(SLIDE_RANGE, {duration: 1000}), // Move slider to the right in 1 second
        0, // Repeat the animation 2 times
        true, // Reverse direction after reaching end
      );
    };

    startHintAnimation(); // Trigger hint animation on mount
  }, []);

  const handleConfirm = (isConfirmed: boolean) => {
    if (!confirmed && isConfirmed) {
      setConfirmed(true);
      onConfirm(); // Call the confirm action
    }
  };

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {startX: number}
  >({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      cancelAnimation(translateX);
    },
    onActive: (event, ctx) => {
      translateX.value = Math.min(
        Math.max(ctx.startX + event.translationX, 0),
        SLIDE_RANGE,
      );
    },
    onEnd: () => {
      if (translateX.value > SLIDE_RANGE * 0.95) {
        translateX.value = withSpring(SLIDE_RANGE);
        runOnJS(handleConfirm)(true);
      } else {
        translateX.value = withSpring(0);
        runOnJS(handleConfirm)(false);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateX.value,
        [0, SLIDE_RANGE * 0.95],
        [1, 0],
        Extrapolate.CLAMP,
      ),
    };
  });

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={[styles.sliderContainer]}>
          <Animated.Text style={[styles.sliderText, animatedTextStyle]}>
            Slide to Confirm
          </Animated.Text>
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.slider, animatedStyle]}>
              <Image
                source={require('../asset/arrowRight.png')} // Arrow image path
                style={styles.arrowImage} // Style the image
              />
            </Animated.View>
          </PanGestureHandler>
        </View>
        {confirmed && <Text style={styles.confirmedText}>Confirmed!</Text>}
      </View>
    </GestureHandlerRootView>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Reactivate this for layout purposes
    justifyContent: 'center', // Adjust to center the slider
    alignItems: 'center',
  },
  sliderContainer: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    backgroundColor: '#ddd',
    borderRadius: BUTTON_HEIGHT / 2,
    padding: BUTTON_PADDING,
    justifyContent: 'center',
    position: 'relative',
  },
  sliderText: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  slider: {
    width: SLIDER_SIZE,
    height: SLIDER_SIZE,
    borderRadius: SLIDER_SIZE / 2,
    backgroundColor: 'black',
    position: 'absolute',
    top: BUTTON_PADDING,
    left: BUTTON_PADDING,
    justifyContent: 'center', // Center the image
    alignItems: 'center', // Center the image
  },
  arrowImage: {
    width: 20, // Adjust the size as needed
    height: 20, // Adjust the size as needed
    tintColor: '#fff', // Change the color of the arrow if needed
  },
  confirmedText: {
    marginTop: 20,
    fontSize: 18,
    color: '#06d6a0',
    fontWeight: 'bold',
  },
});
