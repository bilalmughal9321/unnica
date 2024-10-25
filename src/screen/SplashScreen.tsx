import React, {useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, TouchableOpacity, View} from 'react-native';
import CreditCardListScreen from '../components/CardList';
import CrediCard from '../components/Card';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
CreditCardListScreen;

type SplashScreenProps = StackScreenProps<any, 'Splash'>;

const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  const details = useSelector(
    (state: RootState) => state.cardReducer.cardDetails,
  ); // State ko access karein

  useEffect(() => {
    console.log('card details: ', details);
  });

  return (
    <View>
      <CrediCard
        cardDetails={{
          background: details.background == '' ? 'gold' : details.background,
          number: details.number == '' ? '0000000000000000' : details.number,
          name: details.name == '' ? 'Bilal' : details.name,
          expiry: details.expiry == '' ? '25/25' : details.expiry,
          cvc: details.expiry == '' ? '123' : details.expiry,
        }}
        onCardPress={() => navigation.navigate('Welcome')}
      />
    </View>
  );
};

export default SplashScreen;
