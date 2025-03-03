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

type SignUpProps = {
  navigation: StackNavigationProp<any, typeof NavigationStrings.SIGNUP>;
};

const SignupFormScreen: React.FC<SignUpProps> = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const storage = new MMKV();
  const dispatch = useDispatch<AppDispatch>();
  const val = useSelector((state: RootState) => state.Unnica);

  const phoneNumber = '+34622222222'; // Example phone number
  const encodedPhone = encodeURIComponent(phoneNumber); // Encode the phone number

  const isLoadingOTP = useSelector((state: RootState) => state);

  const {load, data, err} = useSelector((state: RootState) => state.Unnica);

  useEffect(() => {
    if (clearData) {
      storage.clearAll();
    }

    let step = storage.getNumber('Step');

    if (step == 1) {
      let data = storage.getString('USER_DATA');
      if (data) {
        console.log('saved value: ', JSON.parse(data));
        let value = JSON.parse(data);

        toaster('sign up process step 1 is already completed.');

        const timer = setTimeout(() => {
          navigation.navigate(NavigationStrings.GENERATE_USERNAME, {
            fn: value.firstName,
            ln: value.lastName,
            email: value.email,
            password: value.password,
          });
        }, 3000);
        // Clear timeout on component unmount
        return () => clearTimeout(timer);
      }
    } else if (step == 2) {
      let data = storage.getString('USER_DATA');
      if (data) {
        console.log('saved value: ', JSON.parse(data));
        let value = JSON.parse(data);

        toaster('sign up process step 1 and 2 is already completed.');

        const timer = setTimeout(() => {
          navigation.navigate(NavigationStrings.OTP, {
            fn: value.firstName,
            ln: value.lastName,
            email: value.email,
            password: value.password,
            username: value.username,
            dob: value.dob,
            number: value.number,
          });
        }, 3000);
        // Clear timeout on component unmount
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // useEffect(() => {
  //   console.log('value: ', load);
  // }, [load]);

  // useEffect(() => {
  //   console.log('err: ', err);
  // }, [err]);

  const handleNext = () => {
    if (firstName.trim() && lastName.trim()) {
      navigation.navigate('GenerateUsername', {firstName, lastName});
    } else {
      Alert.alert('Please enter your first and last name');
    }
  };

  const submit = () => {
    if (firstName == '') {
      toaster('First name is missing');
    } else if (lastName == '') {
      toaster('First name is missing');
    } else if (password == '') {
      toaster('Password is missing');
    } else if (confirmPassword == '') {
      toaster('Confirm password is missing');
    } else if (password != confirmPassword) {
      toaster('Password is not match with comfirm password');
    } else {
      const userData = {
        firstName,
        lastName,
        email,
        password,
      };

      storage.set('USER_DATA', JSON.stringify(userData)); // Store object as JSON
      storage.set('Step', 1); // Store step completion

      console.log('User data saved:', userData);
      console.log('Step 1 completed.');

      toaster('STEP 1 COMPLETED');

      navigation.navigate(NavigationStrings.GENERATE_USERNAME, {
        fn: firstName,
        ln: lastName,
        email: email,
        password: password,
      });

      // dispatch(
      //   fetchApiData(
      //     'GET_OTP',
      //     `http://api.ci.unnica-dev.co/admin/otp?phone=${encodedPhone}`,
      //     'GET',
      //   ),
      // );
    }
  };

  return (
    <ScreenWrapper isBackground={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled">
          <View style={styles.innerContainer}>
            <Image
              style={styles.titleImage}
              source={require('../../asset/unnica_logo.png')}
            />

            <View style={styles.box}>
              <View style={styles.textWrapper}>
                <Text style={styles.text}>{english.signTitle}</Text>
              </View>
              <View style={{padding: 5}}>
                <View style={styles.VStackView}>
                  <View style={styles.HStackView}>
                    <TextInput
                      style={styles.textField}
                      placeholder={english.firstName}
                      value={firstName}
                      onChangeText={setFirstName}
                    />
                    <TextInput
                      style={styles.textField}
                      placeholder={english.lstName}
                      value={lastName}
                      onChangeText={setLastName}
                    />
                  </View>

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

                  <View style={styles.HStackView}>
                    <TextInput
                      style={styles.textField}
                      placeholder={english.confirmPassword}
                      value={confirmPassword}
                      secureTextEntry
                      onChangeText={setConfirmPassword}
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
        <FooterText />
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
});

export default SignupFormScreen;
