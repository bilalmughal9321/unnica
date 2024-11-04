import React, {useEffect} from 'react';
import {View, TouchableOpacity, Image, Alert, Text} from 'react-native';
// import {StatusBar} from 'expo-status-bar';
import {StackScreenProps} from '@react-navigation/stack';
import PoweredBy from '../components/PoweredBy';
import {styles} from '../../style';
import TouchID from 'react-native-touch-id';
import {Constant} from '../Utils';

type SplashScreenProps = StackScreenProps<any, 'Splash'>;

const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  const optionalConfigObject = {
    title: 'Authentication Required', // Android
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Welcome');
    }, 2000);

    // Clear timeout on component unmount
    return () => clearTimeout(timer);
  }, []);

  const handlePress = () => {
    navigation.navigate('Welcome');
    // TouchID.authenticate(
    //   'to demo this react-native component',
    //   optionalConfigObject,
    // )
    //   .then(success => {
    //     // Alert.alert('Authenticated Successfully');
    //     navigation.navigate('Open');
    //   })
    //   .catch(error => {
    //     // Alert.alert('Authentication Failed');
    //   });
  };

  const Splash_Image = () => {
    return (
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'column',
          width: '70%',
          alignItems: 'center',
        }}>
        <Image
          source={require('../asset/new/Logo.png')}
          style={{width: '70%', resizeMode: 'contain', height: 200}}
        />

        <Text
          style={{
            fontSize: 35,
            color: Constant.themeYellowColor,
            textAlign: 'center',
            fontWeight: '700',
            marginTop: 30,
            width: '80%',
          }}>
          UNNICA
        </Text>

        <Text
          style={{
            fontSize: 22,
            color: Constant.whiteColor,
            textAlign: 'center',
            fontWeight: '700',
            marginTop: 30,
            width: '70%',
          }}>
          Say hello to a new way of shopping
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Splash_Image />
    </View>
  );
};

export default SplashScreen;
