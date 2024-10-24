/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

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

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {useSelector, useDispatch} from 'react-redux';
import {RootState} from './src/redux/reducer'; // RootState import karein
import ReduxComponent from './src/components/ReduxComponent';
import CrediCard from './src/components/Card';
import {formatCardNumber} from './src/Utils';
import Slider from './src/components/Slide';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const cardPress = () => {
    console.log('card pressed');
  };

  const onConfirm = () => {
    console.log('slide to confirm');
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      {/* Card */}
      <CrediCard
        cardDetails={{
          background: 'blue',
          name: 'Bilal',
          number: formatCardNumber('0000000000000000'),
          expiry: '20/25',
          cvc: '123',
        }}
        onCardPress={cardPress}
      />

      <Slider onConfirm={onConfirm} />
    </SafeAreaView>
  );
}

export default App;
