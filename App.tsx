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
import {createDrawerNavigator} from '@react-navigation/drawer';

import {useSelector, useDispatch} from 'react-redux';
import {RootState} from './src/redux/reducer'; // RootState import karein
import ReduxComponent from './src/components/ReduxComponent';
import CrediCard from './src/components/Card';
import {formatCardNumber} from './src/Utils';
import Slider from './src/components/Slide';
import CreditCardListScreen from './src/components/CardList';
import WelcomeScreen from './src/screen/WelcomeScreen';
import CardListScreen from './src/screen/CardListScreen';
import PharmacyScreen from './src/screen/PhaarmacyScreen';
import SplashScreen from './src/screen/SplashScreen';
import CartScreen from './src/screen/CartListScreen';
import SignupFormScreen from './src/screen/SignUp/SignupFormScreen';
import GenerateUsernameScreen from './src/screen/SignUp/GenerateUsernameScreen';
import OtpScreen from './src/screen/SignUp/OtpScreen';
import NavigationStrings from './src/Constant/NavigationStrings';
import ScreenWrapper from './src/components/ScreenWrapper';
import SignUpSuccess from './src/screen/SignUp/signSuccess';
import SocialSignupScreen from './src/screen/SignUp/SocialSignup';
import SigninFormScreen from './src/screen/SignIn/SigInFormScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

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

  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator initialRouteName="About">
        <Drawer.Screen name="About" component={AboutScreen} />
        <Drawer.Screen name="Contact Us" component={ContactUsScreen} />
      </Drawer.Navigator>
    );
  };

  const AboutScreen = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>About Us</Text>
      </View>
    );
  };

  const ContactUsScreen = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Contact Us</Text>
      </View>
    );
  };

  return (
    <ScreenWrapper isBackground>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={NavigationStrings.SPLASH}>
          <Stack.Screen
            name={NavigationStrings.SPLASH}
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={NavigationStrings.SIGNUP}
            component={SignupFormScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={NavigationStrings.SIGNIN}
            component={SigninFormScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={NavigationStrings.SOCIALSIGNUP}
            component={SocialSignupScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={NavigationStrings.GENERATE_USERNAME}
            component={GenerateUsernameScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={NavigationStrings.OTP}
            component={OtpScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={NavigationStrings.SIGNUP_SUCCESS}
            component={SignUpSuccess}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={NavigationStrings.WELCOME}
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={NavigationStrings.CARD_LIST}
            component={CardListScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={NavigationStrings.PHARMACY}
            component={PharmacyScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={NavigationStrings.CART}
            component={CartScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Drawer" component={DrawerNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </ScreenWrapper>
  );
}

export default App;
