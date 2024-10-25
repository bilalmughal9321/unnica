import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, TouchableOpacity, View} from 'react-native';
import CreditCardListScreen from '../components/CardList';

type WelcomeScreenProps = StackScreenProps<any, 'Welcome'>;

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <CreditCardListScreen />
    </View>
  );
};

export default WelcomeScreen;
