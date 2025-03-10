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
import {AppDispatch, RootState} from '../../../redux/store';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import NavigationStrings from '../../../Constant/NavigationStrings';
import ScreenWrapper from '../../../components/ScreenWrapper';
import {Color} from '../../../Constant/Color';
import FooterText from '../../../components/Footer';
import {english} from '../../../localization/english';
import Toast from 'react-native-simple-toast';
import {clearData, toaster} from '../../../Utils';
import {MMKV} from 'react-native-mmkv';
import {loader} from '../../../components/Loader';
import auth from '@react-native-firebase/auth';
import {
  apiReset,
  endLoader,
  fetchApiData,
  startLoader,
} from '../../../redux/actions';
import {API_ACTIONS} from '../../../Constant/apiActionTypes';
import {api_method, api_url} from '../../../Constant/url';

type SignInProps = {
  navigation: StackNavigationProp<any, typeof NavigationStrings.SIGNIN>;
};

const SigninFormScreen: React.FC<SignInProps> = ({navigation}) => {
  // ░▒▓████████████████████████ STATE █████████████████████████▓▒░

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ░▒▓████████████████████████ STORAGE █████████████████████████▓▒░

  const storage = new MMKV();

  // ░▒▓████████████████████████ REDUX █████████████████████████▓▒░

  const dispatch = useDispatch<AppDispatch>();
  const {load, data, err} = useSelector((state: RootState) => state.Unnica);

  // ░▒▓████████████████████████ FORM SUBMISSION █████████████████████████▓▒░

  const submit = () => {
    if (email == '') {
      toaster('Email is missing');
    } else if (password == '') {
      toaster('Password is missing');
    } else if (password.length <= 5) {
      toaster('Password must be 6 characters long');
    } else {
      SignInFirebase(email, password);
    }
  };

  const signInApi = (idToken: string) => {
    dispatch(
      fetchApiData(API_ACTIONS.SIGNIN, api_url.signin, api_method.post, {
        idToken,
      }),
    );
  };

  // ░▒▓████████████████████████ FIREBASE SIGN-IN █████████████████████████▓▒░

  const SignInFirebase = async (email: string, password: string) => {
    dispatch(startLoader());
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const idToken = await userCredential.user.getIdToken();
      console.log('User signed in successfully. ID Token:', idToken);
      signInApi(idToken);
    } catch (error) {
      dispatch(endLoader());
      console.error('Error signing in:', error);
      throw error;
    }
  };

  // ░▒▓████████████████████████ CHECK SIGN-IN RESPONSE █████████████████████████▓▒░

  useEffect(() => {
    if (data.SIGNIN) {
      dispatch(endLoader());
      console.log(data.SIGNIN);

      navigation.navigate(NavigationStrings.SIGNUP_SUCCESS);
    }
  }, [data.SIGNIN]);

  useEffect(() => {
    if (err.SIGNIN) {
      console.log(err.SIGNIN);
      // toaster(err.SIGNIN.msg);
      dispatch(apiReset(API_ACTIONS.SIGNIN));
    }
  }, [err.SIGNIN]);

  // ░▒▓████████████████████████ UI COMPONENT █████████████████████████▓▒░

  return (
    <ScreenWrapper isBackground={false}>
      {load && loader()}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled">
          <View style={styles.innerContainer}>
            <Image
              style={styles.titleImage}
              source={require('../../../asset/unnica_logo.png')}
            />

            <View style={styles.box}>
              <View style={styles.textWrapper}>
                <Text style={styles.text}>{english.signInTitle}</Text>
              </View>
              <View style={{padding: 5}}>
                <View style={styles.VStackView}>
                  <View style={styles.HStackView}>
                    <TextInput
                      style={styles.textField}
                      placeholder={english.email}
                      value={email}
                      onChangeText={setEmail}
                    />
                  </View>

                  <View style={styles.HStackView}>
                    <TextInput
                      style={styles.textField}
                      placeholder={english.password}
                      value={password}
                      secureTextEntry
                      onChangeText={setPassword}
                    />
                  </View>
                </View>
              </View>
            </View>

            <TouchableOpacity onPress={submit} style={styles.confirmPwd}>
              <Text style={styles.confirmPwdText}>
                {english.signUpSubmitBtn}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <TouchableOpacity
          onPress={() => navigation.navigate(NavigationStrings.SIGNUP)}
          style={styles.poweredByContainer}>
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
            Don't have an account?{' '}
            <Text style={{color: '#1486EC'}}>{`Create one`}</Text>.
          </Text>
        </TouchableOpacity>

        <FooterText />
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

// ░▒▓████████████████████████ STYLES █████████████████████████▓▒░

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  innerContainer: {
    alignItems: 'center',
    paddingBottom: 30,
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
    padding: 20,
    paddingVertical: 30,
    position: 'relative',
  },
  textWrapper: {
    position: 'absolute',
    top: -10,
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
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

export default SigninFormScreen;
