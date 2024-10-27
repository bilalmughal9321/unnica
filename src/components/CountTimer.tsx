import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

interface CircularCountdownTimerProps {
  duration: number; // Total countdown duration in seconds
  onComplete: () => void;
}

const CircularCountdownTimer: React.FC<CircularCountdownTimerProps> = ({
  duration,
  onComplete,
}) => {
  const radius = 60; // Increased radius for a larger circle
  const circumference = 2 * Math.PI * radius;

  const [remainingTime, setRemainingTime] = useState(duration);
  const [color, setColor] = useState('#008000'); // Initial color
  const [strokeDashoffset, setStrokeDashoffset] = useState(circumference);

  useEffect(() => {
    if (remainingTime <= 0) {
      onComplete(); // Call onComplete callback when timer finishes
      return;
    }

    // Countdown interval to decrement time by 1 second
    const interval = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 1);
      setStrokeDashoffset((remainingTime / duration) * circumference);
    }, 1000);

    // Change color based on remaining time
    if (remainingTime > 100) {
      setColor('#008000'); // Red color
    } else if (remainingTime < 100 && remainingTime > 60) {
      setColor('#dca54a'); // Orange color
    } else if (remainingTime > 30) {
      setColor('#FF0000'); // Green color
    }

    return () => clearInterval(interval);
  }, [remainingTime]);

  return (
    <View style={styles.container}>
      <Svg width={190} height={190} viewBox="0 0 140 140">
        {' '}
        {/* Adjusted SVG size */}
        <Circle
          cx="70"
          cy="70"
          r={radius}
          stroke="#e6e6e6"
          strokeWidth="10"
          fill="none"
        />
        <Circle
          cx="70"
          cy="70"
          r={radius}
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 70 70)" // Rotate the circle to start from the top
        />
      </Svg>
      {/* Centered Text */}
      <View style={styles.centeredTextContainer}>
        {/* <Text style={[styles.timerText, {color}]}>{remainingTime} sec</Text> */}
        <Text style={[styles.statusText, {color}]}>
          {/* {remainingTime > 100 ? 'Door is closed' : 'Door is open'} */}
          {remainingTime > 100 ? (
            <Text style={{fontSize: 20, color: '#008000'}}>Door is Open</Text>
          ) : remainingTime < 100 && remainingTime > 60 ? (
            <Text style={{fontSize: 20, color: '#dca54a'}}>Door is open</Text>
          ) : (
            <Text style={{fontSize: 20, color: '#FF0000'}}>Door is closed</Text>
          )}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 16,
  },
});

export default CircularCountdownTimer;
