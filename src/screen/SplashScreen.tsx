import React from 'react';
import {View, TouchableOpacity, Image, Alert} from 'react-native';
// import {StatusBar} from 'expo-status-bar';
import {StackScreenProps} from '@react-navigation/stack';
import PoweredBy from '../components/PoweredBy';
import {styles} from '../../style';
import TouchID from 'react-native-touch-id';

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

  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <TouchableOpacity onPress={handlePress}>
        <Image
          source={require('../asset/splash2.png')}
          style={[styles.scanImage, {borderRadius: 20}]}
        />
      </TouchableOpacity>
      {/* <Image
        source={require('../assets/images/unnica_logo.png')}
        style={styles.unnicalogo}
      /> */}
      <PoweredBy />
    </View>
  );
};

export default SplashScreen;
