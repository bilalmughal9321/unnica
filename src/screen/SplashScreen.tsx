import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, Text, Alert} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {styles} from '../../style';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {english} from '../localization/english';
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import NavigationStrings from '../Constant/NavigationStrings';

type SplashScreenProps = StackScreenProps<any, typeof NavigationStrings.SPLASH>;

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

  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // const user = checkUserLogin();
    // console.log('User:', user ? 'Already logged in' : 'No user logged in');

    // if (isLoggedIn) {
    const timer = setTimeout(() => {
      // navigation.navigate(NavigationStrings.SIGNIN);

      navigation.reset({
        index: 0, // Set index to 1 (0-based index), keeping Splash at index 0 and Screen1 at index 1
        routes: [{name: NavigationStrings.SIGNIN}],
      });
    }, 3000);
    // Clear timeout on component unmount
    return () => clearTimeout(timer);
    // } else {
    //   // Alert.alert('user is not logged in');
    // }
  }, []);

  const Splash_Image = () => {
    return (
      <View style={[styles.splash_image]}>
        <Image
          source={require('../asset/new/Logo.png')}
          style={styles.splash_image_logo}
        />
        <Text style={styles.splash_image_title}>{english.unnicaTitle}</Text>
        <Text style={styles.splash_image_subtitle}>{english.sayHello}</Text>
      </View>
    );
  };

  const googleLogin = async () => {
    GoogleSignin.configure({
      webClientId:
        '1075936012101-5l3p7niseichilfl4ntfdjhg7ftr1ptv.apps.googleusercontent.com',
    });
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log('userinfo log: ', userInfo.data?.idToken);

    if (!userInfo.data?.idToken) {
      throw new Error('Google Sign-In Failed: No ID Token received');
    }

    const extracted = userInfo.data?.idToken;
    const googleCredential = auth.GoogleAuthProvider.credential(extracted);
    const userCredential = await auth().signInWithCredential(googleCredential);

    console.log('user: ', userCredential.user);
    return userInfo;
  };

  async function onAppleButtonPress() {
    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        // Note: it appears putting FULL_NAME first is important, see issue #293
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      const {identityToken, nonce} = appleAuthRequestResponse;

      if (!identityToken) {
        throw new Error('Apple Sign-In failed: No identity token returned');
      }

      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      console.log('apple token log: ', appleAuthRequestResponse.identityToken);

      // Create Firebase Apple Credential
      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );

      // Step 4: Sign In with Firebase
      const userCredential = await auth().signInWithCredential(appleCredential);

      console.log('Apple Sign-In Success:', userCredential.user);

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
        console.log('user is authenticated');
      }
    } catch (error) {
      console.error('❌ Apple Sign-In Error:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Splash_Image />
      {/* <TouchableOpacity
        onPress={googleLogin}
        style={{
          backgroundColor: 'blue',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
          // paddingTop: 20,
        }}>
        <Text>Google Signin</Text>
      </TouchableOpacity> */}

      {/* <TouchableOpacity
        onPress={() => onAppleButtonPress()}
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
          // paddingTop: 20,
        }}>
        <Text style={{color: 'black'}}>Apple Sign In</Text>
      </TouchableOpacity> */}
      {/* <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={async () => {
          try {
            const response = await googleLogin();
            const {data} = response;

            console.log('idToken log: ', data?.idToken);

            const extractedIdToken = data?.idToken;
          } catch (error) {
            console.log('error logs: ', error);
          }
        }}
        disabled={false}
      />
      ; */}
    </View>
  );
};

export default SplashScreen;
