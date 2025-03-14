import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import NavigationStrings from '../../../Constant/NavigationStrings';
import ScreenWrapper from '../../../components/ScreenWrapper';
import {Color} from '../../../Constant/Color';
import {english} from '../../../localization/english';
import DatePicker from 'react-native-date-picker';
import {RouteProp} from '@react-navigation/native';
import {text} from 'stream/consumers';
import {dateFormateUS, isValidUSPhoneNumber, toaster} from '../../../Utils';
import {MMKV} from 'react-native-mmkv';
import {useSelector, useDispatch} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux/store';
import {apiReset, fetchApiData, startLoader} from '../../../redux/actions';
import {API_ACTIONS} from '../../../Constant/apiActionTypes';
import {api_method, api_url} from '../../../Constant/url';
import {errorString} from '../../../Constant/ErrorString';
import {opacity} from 'react-native-reanimated/lib/typescript/Colors';
import CountryCodePicker from '../../../Constant/CountryCodePicker';

type GeneratedUsernameProps = {
  navigation: StackNavigationProp<
    any,
    typeof NavigationStrings.GENERATE_USERNAME
  >;
  route: RouteProp<any, typeof NavigationStrings.GENERATE_USERNAME>;
};

const GenerateUsernameScreen: React.FC<GeneratedUsernameProps> = ({
  navigation,
  route,
}) => {
  // ░▒▓████████████████████████ STATE █████████████████████████▓▒░

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [number, setNumber] = useState('');
  const [dob, setDob] = useState('Date of birth');
  const [code, setCode] = useState('+55');
  const [date, setDate] = useState(new Date());
  const [Picker, setPicker] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(false);
  const [social, setSocial] = useState(false);
  const [getSocialToken, setSocialToken] = useState();
  const [showEmail, setShowEmail] = useState(false);
  const [getEmail, setEmail] = useState('');
  const storage = new MMKV();

  // ░▒▓████████████████████████ NAVIGATION & REDUX █████████████████████████▓▒░
  const {fn, ln, email, password, fromSocial, socialToken} = route.params || {};
  const dispatch = useDispatch<AppDispatch>();
  const {data, err} = useSelector((state: RootState) => state.Unnica);

  // ░▒▓████████████████████████ EFFECT HOOKS █████████████████████████▓▒░
  useEffect(() => {
    setImage(true);
    setTimeout(() => {
      setImage(false);
    }, 3000);

    setFirstName(fn);
    setLastName(ln);
    generateRandomUsername();
    setSocialToken(socialToken);
    setShowEmail(socialToken == undefined ? false : true);
    if (socialToken != undefined) {
      setEmail(email);
    }
  }, []);

  useEffect(() => {
    if (firstName && lastName) {
      generateRandomUsername();
    }
  }, [firstName, lastName]);

  const ImageLogo = () => {
    return (
      <View style={styles.logoImageView}>
        <Image
          style={styles.logoImage}
          source={require('../../../asset/unnica_logo.png')}
        />
        <Text style={styles.welcomeText}>{english.genUsernameWelcome}</Text>
      </View>
    );
  };

  useEffect(() => {
    if (data.SIGNUP) {
      let fullNumber = `${code}${number}`;

      const userData = {
        fn,
        ln,
        email,
        password,
        username,
        dob,
        fullNumber,
      };

      dispatch(apiReset(API_ACTIONS.SIGNUP));

      storage.set('USER_DATA', JSON.stringify(userData));
      storage.set('Step', 2);

      navigation.navigate(NavigationStrings.OTP, {
        fn: fn,
        ln: ln,
        email: email,
        password: password,
        username: username,
        dob: dob,
        number: `${code}${number}`,
        socialToken: socialToken,
      });
    }
  }, [data.SIGNUP]);

  useEffect(() => {
    if (err.SIGNUP) {
      toaster(err.SIGNUP.msg);
      dispatch(apiReset(API_ACTIONS.SIGNUP));
    }
  }, [err.SIGNUP]);

  // ░▒▓████████████████████████ HELPER FUNCTIONS █████████████████████████▓▒░

  const generateRandomUsername = useCallback(() => {
    if (firstName && lastName) {
      setIsLoading(true); // Show loader
      const randomNum = Math.floor(Math.random() * 10000000) + 1;

      setTimeout(() => {
        setUsername(`${firstName}_${lastName}_${randomNum}`);
        setIsLoading(false); // Hide loader after 1 sec
      }, 1000);
    }
  }, [firstName, lastName]);

  // ░▒▓████████████████████████ FORM HANDLERS █████████████████████████▓▒░

  const handleFname = (props: any) => setFirstName(props);
  const handleLname = useCallback((props: any) => setLastName(props), []);
  const handleUsername = useCallback((props: any) => setUsername(props), []);
  const handleNumber = useCallback((props: any) => setNumber(props), []);

  // ░▒▓████████████████████████ SUBMISSION HANDLER █████████████████████████▓▒░

  const onSubmit = () => {
    if (!username) return toaster(errorString.usernameMissing);
    if (!Picker) return toaster(errorString.dateOfBirthMissing);
    if (!number) return toaster(errorString.numberMissing);

    const fullNumber = `${code}${number}`;

    // if (!isValidUSPhoneNumber(fullNumber)) {
    //   return toaster(errorString.numberWrong);
    // }

    const userData: any = {
      firstName,
      lastName,
      username,
      dob,
      phone: fullNumber,
      isSocial: getSocialToken == undefined ? false : true,
    };

    if (getSocialToken != undefined) {
      userData.email = email;
    }

    console.log('submit data: ', userData);

    dispatch(
      fetchApiData(
        API_ACTIONS.SIGNUP,
        api_url.signup2,
        api_method.post,
        userData,
      ),
    );
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const countries = [
    {name: 'Pakistan', code: '+92'},
    {name: 'India', code: '+91'},
    // Add more countries as needed
  ];

  const handleSelectCountry = (code: any) => {
    console.log('country: ', code);
    // setSelectedCountry(country);
    setCode(code);
    setModalVisible(false);
  };

  // ░▒▓████████████████████████ UI COMPONENT █████████████████████████▓▒░

  return (
    <ScreenWrapper isBackground={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.container2}>
            <Text
              style={{
                color: 'white',
                fontWeight: '500',
                fontSize: 25,
                marginTop: 10,
              }}>
              <Text style={{fontSize: 40}}>Wait!</Text> Almost Done...
            </Text>

            <Text
              style={{
                color: 'white',
                fontWeight: '500',
                fontSize: 25,
                marginBottom: 20,
              }}>
              Please verify and complete
            </Text>

            <View style={styles.box}>
              <View style={{padding: 5}}>
                {/* VStack */}
                <View style={styles.VStackView}>
                  <View style={styles.HStackView}>
                    <View style={styles.parentTexfieldView}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          fontWeight: '600',
                          paddingBottom: 4,
                        }}>
                        {english.firstName}
                      </Text>
                      <TextInput
                        style={styles.textField}
                        placeholder={english.firstName}
                        value={firstName}
                        onChangeText={handleFname}
                        editable={true}
                      />
                    </View>

                    <View style={styles.parentTexfieldView}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          fontWeight: '600',
                          paddingBottom: 4,
                        }}>
                        {english.lstName}
                      </Text>
                      <TextInput
                        style={styles.textField}
                        placeholder={english.lstName}
                        value={lastName}
                        onChangeText={handleLname}
                        editable={true}
                      />
                    </View>
                  </View>

                  {getEmail != '' ? (
                    <View style={styles.HStackView}>
                      <View style={styles.parentTexfieldView}>
                        <Text
                          style={{
                            alignSelf: 'center',
                            fontWeight: '600',
                            paddingBottom: 4,
                          }}>
                          {english.email}
                        </Text>
                        <TextInput
                          style={[styles.textField, {color: '#807d7d'}]}
                          placeholder={english.email}
                          value={getEmail}
                          editable={false}
                        />
                      </View>
                    </View>
                  ) : null}

                  <View style={styles.HStackView}>
                    <View style={styles.parentTexfieldView}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          fontWeight: '600',
                          paddingBottom: 4,
                        }}>
                        {english.username}
                      </Text>
                      <View style={[styles.textField, {flex: 1}]}>
                        {isLoading ? (
                          <ActivityIndicator
                            size="small"
                            color="black"
                            style={{marginRight: 10, flex: 1}}
                          />
                        ) : (
                          <TextInput
                            style={{flex: 1}}
                            placeholder={english.username}
                            onChangeText={handleUsername}
                            value={username}
                            editable={true}
                          />
                        )}
                        <TouchableOpacity
                          onPress={() => generateRandomUsername()}
                          style={styles.penImageTouchableOpacity}>
                          <Image
                            style={styles.penImage}
                            source={require('../../../asset/pen.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View style={styles.HStackView}>
                    <View style={styles.parentTexfieldView}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          fontWeight: '600',
                          paddingBottom: 4,
                        }}>
                        {english.dobText}
                      </Text>
                      <TouchableOpacity
                        onPress={() => setOpen(true)}
                        style={styles.textField}>
                        <Text
                          style={{
                            textAlign: 'center',
                            alignSelf: 'center',
                          }}>
                          {dob}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      // gap: 10,
                      height: 70,
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontWeight: '600',
                        paddingBottom: 4,
                        height: 20,
                      }}>
                      Verify Mobile Number
                    </Text>

                    <View style={[styles.HStackView, {height: 50}]}>
                      <View style={[styles.parentTexfieldView, {flex: 1}]}>
                        {/* <Text
                        style={{
                          alignSelf: 'center',
                          color: 'transparent',
                          paddingBottom: 4,
                        }}>
                        V
                      </Text> */}
                        <TouchableOpacity
                          onPress={() => setModalVisible(true)}
                          style={styles.textField}>
                          <Text
                            style={{
                              flex: 2,
                              alignSelf: 'center',
                              // backgroundColor: 'blue',
                            }}>
                            {code}
                          </Text>
                          <Image
                            style={{
                              // width: 15,
                              height: 25,
                              flex: 1,
                              // marginLeft: 25,
                              tintColor: Color.themeOrangeColor,
                              // backgroundColor: 'red',
                            }}
                            source={require('../../../asset/arrowDown.png')}
                          />
                        </TouchableOpacity>
                      </View>

                      <View style={[styles.parentTexfieldView, {flex: 2}]}>
                        {/* <Text
                        style={{
                          alignSelf: 'center',
                          fontWeight: '600',
                          paddingBottom: 4,
                        }}>
                        Verify Mobile Number
                      </Text> */}
                        <TextInput
                          style={styles.textField}
                          placeholder={english.number}
                          value={number}
                          onChangeText={handleNumber}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <TouchableOpacity onPress={onSubmit} style={styles.confirmPwd}>
              <Text style={styles.confirmPwdText}>
                {english.signUpSubmitBtn}
              </Text>
            </TouchableOpacity>

            <DatePicker
              modal
              open={open}
              date={date}
              mode="date"
              maximumDate={
                new Date(new Date().setFullYear(new Date().getFullYear() - 13))
              }
              onConfirm={date => {
                setPicker(true); // check if the picker is open for the first time
                setOpen(false);
                setDate(date);
                const formattedDate = dateFormateUS(date); // "DD/MM/YYYY" format
                setDob(formattedDate);
                console.log('asdasd');
                console.log(
                  new Date(
                    new Date().setFullYear(new Date().getFullYear() - 13),
                  ),
                );
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />

            <CountryCodePicker
              visible={modalVisible}
              onSelect={handleSelectCountry}
              onClose={() => setModalVisible(false)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 5,
    gap: 10,
  },

  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 10,
  },
  label: {fontSize: 18, fontWeight: 'bold'},
  username: {fontSize: 20, color: 'blue', marginVertical: 10},

  // logo image

  titleHeading: {
    color: 'white',
    fontWeight: '500',
    fontSize: 25,
    marginTop: 10,
  },

  titleHeading2: {
    color: 'white',
    fontWeight: '500',
    fontSize: 25,
    marginBottom: 20,
  },

  logoImageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 30,
  },

  logoImage: {
    width: '100%',
    height: 250,
  },

  welcomeText: {
    color: Color.white,
    fontWeight: '400',
    fontSize: 40,
    width: '60%',
    textAlign: 'center',
  },

  // Username view
  box: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 0.2,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 20,
    paddingVertical: 30,
    position: 'relative', // Required for absolute positioning inside
  },
  HStackView: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    height: 70,
  },
  VStackView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 20,
  },
  parentTexfieldView: {
    // flexDirection: 'column',
    // gap: 5,
    flex: 1,
  },
  textField: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Color.textFieldColor,
    padding: 12,
    borderRadius: 20,
    height: 40,
  },

  textField2: {
    padding: 12,
    borderRadius: 20,
    // height: 40,
  },

  penImageTouchableOpacity: {
    width: 25,
    height: 25,
    alignContent: 'center',
    justifyContent: 'center',
  },

  penImage: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
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

export default GenerateUsernameScreen;
