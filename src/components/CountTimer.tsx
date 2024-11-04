import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

interface CircularCountdownTimerProps {
  duration: number;
  onComplete: () => void;
}

const CircularCountdownTimer: React.FC<CircularCountdownTimerProps> = ({
  duration,
  onComplete,
}) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  const [remainingTime, setRemainingTime] = useState(duration);
  const [color, setColor] = useState('white'); // Initial color
  const [strokeDashoffset, setStrokeDashoffset] = useState(circumference);

  useEffect(() => {
    if (remainingTime <= 0) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 1);
      setStrokeDashoffset((remainingTime / duration) * circumference);
    }, 1000);
    return () => clearInterval(interval);
  }, [remainingTime]);

  return (
    <View style={styles.container}>
      <Svg width={190} height={190} viewBox="0 0 140 140">
        <Circle
          cx="70"
          cy="70"
          r={radius}
          stroke="#5F5F5F"
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
          transform="rotate(-90 70 70)"
        />
      </Svg>
      <View style={styles.centeredTextContainer}>
        <Text style={[styles.statusText, {color}]}>
          <Text
            style={{
              fontSize: 35,
              color: 'white',
              fontWeight: '800',
              textAlign: 'center',
            }}>
            {remainingTime}
            {'\n'}sec
          </Text>
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
