import React, {useEffect} from 'react';
import {View, TouchableOpacity, Image, Alert, Text} from 'react-native';
// import {StatusBar} from 'expo-status-bar';
import {StackScreenProps} from '@react-navigation/stack';
import PoweredBy from '../components/PoweredBy';
import {styles} from '../../style';
import TouchID from 'react-native-touch-id';
import {Constant} from '../Utils';
import {Buffer} from 'buffer';
import Aes from 'react-native-aes-crypto';

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
    // const timer = setTimeout(() => {
    //   navigation.navigate('Welcome');
    // }, 3000);

    // return () => clearTimeout(timer);
    // Base64 encoded values
    // const keyBase64 = 'USymMYYWZdDxkmQYGqc+V0dO2I2O1y7bo+x5IzGxGPU=';
    // const ivBase64 = 'qtyJerluyxRlD2ClhJsbtA==';
    // const encryptedPwdBase64 = 'XXpB+PEtwd01BwNo+23S2w==';

    // Usage
    decryptAES();
    // .then((decryptedText: string | void) => {
    //   if (decryptedText) {
    //     console.log('Decrypted Password:', decryptedText);
    //   }
    // })
    // .catch((error: any) => console.error('Error in decryption:', error));

    // const base64Key = 'USymMYYWZdDxkmQYGqc+V0dO2I2O1y7bo+x5IzGxGPU=';
    // const decodedKey = Buffer.from(base64Key, 'base64'); // Decode Base64 to bytes

    // console.log(decodedKey); // Output in byte array
    // console.log(decodedKey.length); // Should show 32 bytes

    // const hexKey = Buffer.from([
    //   170, 220, 137, 122, 185, 110, 203, 20, 101, 15, 96, 165, 132, 155, 27,
    //   180,
    // ]).toString('hex');
    // console.log(hexKey);

    // const keyHex =
    //   '512ca631861665d0f19264181aa73e57474ed88d8ed72edba3ec792331b118f5';
    // const keyBuffer = Buffer.from(keyHex, 'hex');
    // const kesyBase64 = keyBuffer.toString('base64');
    // console.log(kesyBase64);
  }, []);

  // AES Decryption function
  // const decryptAES = async (
  //   encryptedTextBase64: string,
  //   keyBase64: string,
  //   ivBase64: string,
  // ): Promise<string | void> => {
  //   try {
  //     // Decode Base64 inputs to bytes
  //     const key: Buffer = Buffer.from(keyBase64, 'base64');
  //     const iv: Buffer = Buffer.from(ivBase64, 'base64');
  //     const encryptedText: string = Buffer.from(
  //       encryptedTextBase64,
  //       'base64',
  //     ).toString('utf-8');

  //     console.log('Key (Bytes):', key);
  //     console.log('IV (Bytes):', iv);
  //     console.log('Encrypted Text (Decoded):', encryptedText);

  //     // Decrypt the data using AES-256-CBC
  //     const decrypted: string = await Aes.decrypt(
  //       encryptedText,
  //       key.toString('base64'),
  //       iv.toString('base64'),
  //       'aes-256-cbc',
  //     );
  //     console.log('Decrypted Text:', decrypted);
  //     return decrypted;
  //   } catch (error) {
  //     console.error('Decryption error:', error);
  //   }
  // };

  const decryptAES = async () => {
    try {
      // Input Data (Base64 encoded)
      const keyBase64 = 'USymMYYWZdDxkmQYGqc+V0dO2I2O1y7bo+x5IzGxGPU=';
      const ivBase64 = 'qtyJerluyxRlD2ClhJsbtA==';
      const encryptedPwdBase64 = 'XXpB+PEtwd01BwNo+23S2w==';

      // Algorithm
      const algorithm = 'aes-256-cbc';

      // Decode Base64 inputs to bytes
      const decodedKey = Buffer.from(keyBase64, 'base64'); // Should be 32 bytes
      const decodedIv = Buffer.from(ivBase64, 'base64'); // Should be 16 bytes
      const decodedEncryptedPwd = Buffer.from(encryptedPwdBase64, 'base64'); // Should be in bytes

      console.log('Decoded Key:', decodedKey); // Debug: Check key
      console.log('Decoded Key length:', decodedKey.length); // Debug: Check key
      console.log('\n');
      console.log('Decoded IV:', decodedIv); // Debug: Check IV
      console.log('Decoded IV length:', decodedIv.length); // Debug: Check IV
      console.log('\n');
      console.log('Decoded Encrypted Password:', decodedEncryptedPwd); // Debug: Check ciphertext
      console.log(
        'Decoded Encrypted Password length:',
        decodedEncryptedPwd.length,
      ); // Debug: Check ciphertext
      console.log('\n');

      // Decrypt the password
      const decrypted = await Aes.decrypt(
        decodedEncryptedPwd.toString('base64'), // Ciphertext
        decodedKey.toString('base64'), // Key
        decodedIv.toString('base64'), // IV
        algorithm,
      );
      console.log('Decrypted Password:', decrypted);
    } catch (error) {
      console.error('Decryption Error:', error);
    }
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
