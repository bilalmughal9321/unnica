import React, {useEffect, useRef} from 'react';
import {View, Animated, StyleSheet} from 'react-native';

interface CountdownCircleProps {
  progress: number; // Progress value from 0 to 1
}

const CountdownCircle: React.FC<CountdownCircleProps> = ({progress}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1000, // Duration of the animation in milliseconds
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const radius = 50; // Circle radius
  const strokeWidth = 10; // Stroke width
  const circumference = 2 * Math.PI * radius; // Circumference of the circle

  // Interpolating the stroke dash offset
  const strokeDashOffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Animated.View
          style={{
            position: 'absolute',
            width: 2 * radius,
            height: 2 * radius,
            borderRadius: radius,
            transform: [{rotate: '-90deg'}], // Rotate to start from the top
          }}>
          <Animated.View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: radius,
              borderWidth: strokeWidth,
              borderColor: '#3498db',
              borderTopColor: 'transparent',
              borderRightColor: 'transparent',
              borderBottomColor: 'transparent',
              borderLeftColor: 'transparent',
              borderStyle: 'solid',
              transform: [{rotate: `${progress * 360}deg`}],
              opacity: 0.5,
            }}
          />
          <Animated.View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: radius,
              borderWidth: strokeWidth,
              borderColor: '#ecf0f1',
              borderTopColor: 'transparent',
              borderRightColor: 'transparent',
              borderBottomColor: 'transparent',
              borderLeftColor: 'transparent',
              borderStyle: 'solid',
              //   strokeDasharray: circumference,
              //   strokeDashoffset: strokeDashOffset,
            }}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
});

export default CountdownCircle;
