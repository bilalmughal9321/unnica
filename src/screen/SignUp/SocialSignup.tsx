import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import NavigationStrings from '../../Constant/NavigationStrings';
import ScreenWrapper from '../../components/ScreenWrapper';
import {Color} from '../../Constant/Color';
import FooterText from '../../components/Footer';
import {english} from '../../localization/english';
import Toast from 'react-native-simple-toast';
import {clearData, toaster} from '../../Utils';
import {MMKV} from 'react-native-mmkv';
import {loader} from '../../components/Loader';
import {fetchApiData} from '../../redux/actions';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin';
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';

type SocialSignupProps = {
  navigation: StackNavigationProp<any, typeof NavigationStrings.SOCIALSIGNUP>;
};

const SocialSignupScreen: React.FC<SocialSignupProps> = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {load, data} = useSelector((state: RootState) => state.Unnica);

  const storage = new MMKV();

  useEffect(() => {});

  const googleLogin = async () => {
    GoogleSignin.configure({
      webClientId:
        '1075936012101-5l3p7niseichilfl4ntfdjhg7ftr1ptv.apps.googleusercontent.com',
    });
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    // console.log('userinfo log: ', userInfo.data?.idToken);

    if (!userInfo.data?.idToken) {
      throw new Error('Google Sign-In Failed: No ID Token received');
    }

    const extracted = userInfo.data?.idToken;
    // const googleCredential = auth.GoogleAuthProvider.credential(extracted);
    // const userCredential = await auth().signInWithCredential(googleCredential);

    // console.log('user: ', userInfo.data);

    console.log('first name: ', userInfo.data.user.givenName);
    console.log('last name: ', userInfo.data?.user.familyName);
    console.log('email: ', userInfo.data?.user.email);
    console.log(
      'username: ',
      `${userInfo.data?.user.name}_${userInfo.data?.user.familyName}_${userInfo.data?.user.id}`,
    );
    console.log('dob: ', '');
    console.log('phone: ');
    console.log('idToken: ', userInfo.data?.idToken);
    console.log('isSocial: ', true);

    let fname = userInfo.data.user.givenName;
    let lname = userInfo.data?.user.familyName;
    let email = userInfo.data?.user.email;
    let username = `${userInfo.data?.user.name}_${userInfo.data?.user.familyName}_${userInfo.data?.user.id}`;
    let token = userInfo.data?.idToken;
    let isSocial = true;

    // dispatchApi(fname, lname, email, username, token, isSocial);

    setTimeout(() => {}, 5000);

    dispatch(
      fetchApiData(
        'SIGNUP',
        `http://api.ci.unnica-dev.co/user/signup?p=1`,
        'POST',
        {
          firstName: fname,
          lastName: lname,
          email: email,
          username: username,
          idToken: token,
          isSocial: isSocial,
        },
      ),
    );

    return userInfo;
  };

  const dispatchApi = (
    fname: string | null,
    lname: string | null,
    email: string,
    username: string,
    token: string,
    social: boolean,
  ) => {
    // let fname = data.user.givenName;
    // let lname = data?.user.familyName;
    // let email = data?.user.email;
    // let username = `${data?.user.name}_${data?.user.familyName}_${data?.user.id}`;
    // let token = data?.idToken;
    // let isSocial = true;
  };

  useEffect(() => {
    if (data.SIGNUP) {
      toaster('Account has been created');
      navigation.navigate(NavigationStrings.SIGNUP_SUCCESS);
    }
  }, [data.SIGNUP]);

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
      console.log('apple token log: ', appleAuthRequestResponse);

      let fname = appleAuthRequestResponse.fullName?.givenName;
      let lname = appleAuthRequestResponse.fullName?.familyName;
      let email = appleAuthRequestResponse.email;
      let username = `${appleAuthRequestResponse.fullName?.givenName}_${appleAuthRequestResponse.fullName?.familyName}_${appleAuthRequestResponse.user}`;
      let token = appleAuthRequestResponse.identityToken;
      let isSocial = true;

      setTimeout(() => {
        dispatch(
          fetchApiData(
            'SIGNUP',
            `http://api.ci.unnica-dev.co/user/signup?p=1`,
            'POST',
            {
              firstName: fname,
              lastName: lname,
              email: email,
              username: username,
              idToken: token,
              isSocial: isSocial,
            },
          ),
        );
      }, 3000);

      // Create Firebase Apple Credential
      // const appleCredential = auth.AppleAuthProvider.credential(
      //   identityToken,
      //   nonce,
      // );

      // Step 4: Sign In with Firebase
      //   const userCredential = await auth().signInWithCredential(appleCredential);

      //   console.log('Apple Sign-In Success:', userCredential.user);

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
        console.log('user is authenticated');
      }
    } catch (error) {
      console.error('❌ Apple Sign-In Error:', error);
    }
  }

  const GoogleSignUpButton = () => {
    return (
      <View style={styles.google_container}>
        <TouchableOpacity style={styles.google_button} onPress={googleLogin}>
          <Image
            source={require('../../asset/google.png')}
            style={styles.google_icon}
          />
          <Text style={styles.google_text}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const AppleSignUpButton = () => {
    return (
      <View style={styles.google_container}>
        <TouchableOpacity
          style={styles.google_button}
          onPress={onAppleButtonPress}>
          <Image
            source={require('../../asset/apple.png')}
            style={styles.google_icon}
          />
          <Text style={styles.google_text}>Continue with Apple</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScreenWrapper isBackground={false}>
      {load && loader()}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView
          contentContainerStyle={[styles.scrollView]}
          keyboardShouldPersistTaps="handled">
          <View style={styles.innerContainer}>
            <Image
              style={styles.titleImage}
              source={require('../../asset/unnica_logo.png')}
            />

            <View style={styles.box}>
              <View style={styles.textWrapper}>
                <Text
                  style={[styles.text, {textAlign: 'center', fontSize: 22}]}>
                  {`Continue to Sign up for free\n`}
                  <Text
                    style={[
                      styles.text,
                      {
                        textAlign: 'center',
                        fontSize: 14,
                        color: 'gray',
                      },
                    ]}>
                    If you have an account, we'll log you in.
                  </Text>
                </Text>
              </View>
              <View style={{padding: 1, marginTop: 20}}>
                <View style={styles.VStackView}>
                  <View style={styles.HStackView}>
                    <TouchableOpacity style={{flex: 1}}>
                      <GoogleSignUpButton />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.HStackView}>
                    <TouchableOpacity style={{flex: 1}}>
                      <AppleSignUpButton />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.HStackView}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(NavigationStrings.SIGNIN)
                      }
                      style={{flex: 1}}>
                      <Text style={[styles.text, {textAlign: 'center'}]}>
                        Continue another way
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* <FooterText /> */}
        <View style={styles.poweredByContainer}>
          <Text
            style={[
              styles.poweredByText,
              {
                marginBottom: 100,
                textAlign: 'center',
                paddingVertical: 50,
                paddingHorizontal: 30,
              },
            ]}>
            By continuing you agree to UNNICA's{' '}
            <Text style={{color: '#1486EC'}}>{`Terms of Use.\n`}</Text>
            Read or <Text style={{color: '#1486EC'}}>{`Privacy Policy.`}</Text>
          </Text>
        </View>

        <View style={styles.poweredByContainer}>
          <Text style={styles.poweredByText}>Powered by Unnica</Text>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  innerContainer: {
    alignItems: 'center',
    paddingBottom: 30, // Ensures space when keyboard opens
  },
  titleImage: {
    width: '60%',
    height: 300,
    resizeMode: 'cover',
    marginTop: 10,
  },
  box: {
    width: '85%',
    borderColor: 'gray',
    borderWidth: 0.2,
    borderRadius: 10,
    backgroundColor: 'transparent',
    padding: 15,
    paddingVertical: 30,
    position: 'relative',
  },
  textWrapper: {
    position: 'absolute',
    top: -25,
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  HStackView: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  VStackView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 25,
  },
  textField: {
    flex: 1,
    backgroundColor: Color.textFieldColor,
    padding: 12,
    borderRadius: 20,
  },
  confirmPwd: {
    width: '70%',
    borderRadius: 20,
    backgroundColor: Color.themeOrangeColor,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
  },
  confirmPwdText: {
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
  },

  //   google button

  google_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  google_button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    paddingVertical: 10,
    // paddingHorizontal: 15,
    borderRadius: 25,
    width: '100%',
    justifyContent: 'center',
  },
  google_icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  google_text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },

  poweredByContainer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },

  poweredByText: {
    fontSize: 14,
    color: 'gray',
    fontWeight: '500',
  },
});

export default SocialSignupScreen;
