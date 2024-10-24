import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/reducer'; // RootState import karein

const ReduxComponent = () => {
  const count = useSelector((state: RootState) => state.counterReducer.count); // State ko access karein
  const dispatch = useDispatch();

  const increment = () => {
    dispatch({type: 'INCREMENT'});
  };

  const decrement = () => {
    dispatch({type: 'DECREMENT'});
  };

  return (
    <View>
      <Text>Count: {count}</Text>
      <TouchableOpacity style={styles.button} onPress={increment}>
        <Text style={styles.buttonText}>Increment</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={decrement}>
        <Text style={styles.buttonText}>Decrement</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  counterText: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
  },
});

export default ReduxComponent;
