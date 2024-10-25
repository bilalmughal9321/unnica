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
  FlatList,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {useSelector, useDispatch} from 'react-redux';
import {RootState} from './src/redux/reducer'; // RootState import karein
import ReduxComponent from './src/components/ReduxComponent';
import CrediCard from './src/components/Card';
import {formatCardNumber} from './src/Utils';
import Slider from './src/components/Slide';
import CreditCardListScreen from './src/components/CardList';
import SplashScreen from './src/screen/SplashScreen';
import WelcomeScreen from './src/screen/WelcomeScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  const Stack = createStackNavigator();

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

  const cardData = [
    {
      id: '1',
      background: 'blue',
      number: '0000 0000 0000 0001',
      name: 'Bilal',
      expiry: '12/24',
      cvc: '123',
    },
    {
      id: '2',
      background: 'purple',
      number: '0000 0000 0000 0002',
      name: 'Ali',
      expiry: '01/25',
      cvc: '456',
    },
    {
      id: '3',
      background: 'golden',
      number: '0000 0000 0000 0003',
      name: 'Sara',
      expiry: '11/23',
      cvc: '789',
    },
    // Add more cards as needed
  ];

  const handleCardPress = (cardId: string) => {
    console.log(`Card with ID ${cardId} pressed`);
  };

  return (
    // <SafeAreaView style={backgroundStyle}>
    //   {/* <CreditCardListScreen /> */}

    //   <FlatList
    //     data={cardData}
    //     keyExtractor={item => item.id}
    //     renderItem={({item}) => (
    //       <CrediCard
    //         cardDetails={{
    //           background: item.background,
    //           number: item.number,
    //           name: item.name,
    //           expiry: item.expiry,
    //           cvc: item.cvc,
    //         }}
    //         onCardPress={() => handleCardPress(item.id)}
    //       />
    //     )}
    //   />
    // </SafeAreaView>

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
