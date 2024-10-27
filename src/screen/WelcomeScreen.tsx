import React, {useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import CreditCardListScreen from '../components/CardList';
import CrediCard from '../components/Card';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import PoweredBy from '../components/PoweredBy';
import {formatCardNumber} from '../Utils';
CreditCardListScreen;

type WelcomeScreenProps = StackScreenProps<any, 'Welcome'>;

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({navigation}) => {
  const details = useSelector(
    (state: RootState) => state.cardReducer.cardDetails,
  ); // State ko access karein

  useEffect(() => {
    // console.log('card details: ', details);
  });

  const handlePress = () => {
    // TouchID.authenticate(
    //   'to demo this react-native component',
    //   optionalConfigObject,
    // )
    //   .then(success => {
    //     // Alert.alert('Authenticated Successfully');
    //     navigation.navigate('Pharmacy');
    //   })
    //   .catch(error => {});
    navigation.navigate('Pharmacy');
    // console.log('tap');
  };

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <TextInput
        placeholder="Search..."
        style={{
          height: 40,
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 10,
          marginTop: 20,
          marginHorizontal: 27,
        }}
      />

      <CrediCard
        cardDetails={{
          background: details.background == '' ? 'gold' : details.background,
          number:
            details.number == ''
              ? formatCardNumber('0000000000000000')
              : formatCardNumber(details.number),
          name: details.name == '' ? 'Bilal' : details.name,
          expiry: details.expiry == '' ? '25/25' : details.expiry,
          cvc: details.cvc == '' ? '123' : details.cvc,
        }}
        onCardPress={() => navigation.navigate('CardList')}
      />

      <TouchableOpacity onPress={handlePress}>
        <Image
          source={require('./../asset/Scan.png')}
          style={{
            width: 350, // Ajusta el ancho de la imagen
            height: 350, // Ajusta la altura de la imagen
            resizeMode: 'contain', //Mantiene la relación de aspecto de la imagen
            marginTop: 30,
            alignContent: 'center',
            alignSelf: 'center',
          }}
        />
      </TouchableOpacity>

      <PoweredBy powerStyles={{position: 'absolute', bottom: 20, right: 10}} />
    </View>
  );
};

export default WelcomeScreen;
