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
import {isValidUSPhoneNumber, toaster} from '../../../Utils';
import {MMKV} from 'react-native-mmkv';
import {useSelector, useDispatch} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux/store';
import {apiReset, fetchApiData} from '../../../redux/actions';
import {API_ACTIONS} from '../../../Constant/apiActionTypes';
import {api_method, api_url} from '../../../Constant/url';
import {errorString} from '../../../Constant/ErrorString';

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
  const [code, setCode] = useState('+1');
  const [date, setDate] = useState(new Date());
  const [Picker, setPicker] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [getLogo, setLogo] = useState(false);

  // ░▒▓████████████████████████ STORAGE █████████████████████████▓▒░

  const storage = new MMKV();

  // ░▒▓████████████████████████ NAVIGATION & REDUX █████████████████████████▓▒░
  const {fn, ln, email, password} = route.params || {};
  const dispatch = useDispatch<AppDispatch>();
  const {data, err} = useSelector((state: RootState) => state.Unnica);

  // ░▒▓████████████████████████ EFFECT HOOKS █████████████████████████▓▒░
  useEffect(() => {
    setLogo(true);
    setTimeout(() => {
      setLogo(false);
    }, 3000);
  }, []);

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
        number: `${code} ${number}`,
      });
    }
  }, [data.SIGNUP]);

  useEffect(() => {
    if (err.SIGNUP) {
      // toaster(err.SIGNUP.msg);
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

  const getFormattedDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString('en-US', {month: 'short'});
    const year = date.getFullYear();

    const getDaySuffix = (day: number) => {
      if (day > 3 && day < 21) return 'th';
      const lastDigit = day % 10;
      return lastDigit === 1
        ? 'st'
        : lastDigit === 2
        ? 'nd'
        : lastDigit === 3
        ? 'rd'
        : 'th';
    };

    return `${day}${getDaySuffix(day)} ${month}, ${year}`;
  };

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

    if (!isValidUSPhoneNumber(fullNumber)) {
      return toaster(errorString.numberWrong);
    }

    const userData = {
      firstName,
      lastName,
      username,
      dob,
      phone: fullNumber,
      isSocial: false,
    };

    dispatch(
      fetchApiData(
        API_ACTIONS.SIGNUP,
        api_url.signup2,
        api_method.post,
        userData,
      ),
    );
  };

  // ░▒▓████████████████████████ UI COMPONENT █████████████████████████▓▒░

  const ImageLogo = () => {
    return (
      <View style={styles.logoImageView}>
        <Image
          style={styles.logoImage}
          source={require('../../asset/unnica_logo.png')}
        />
        <Text style={styles.welcomeText}>{english.genUsernameWelcome}</Text>
      </View>
    );
  };

  return (
    <ScreenWrapper isBackground={true}>
      {getLogo ? (
        <ImageLogo />
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.container2}>
            <Text style={[styles.titleHeading]}>
              <Text style={{fontSize: 40}}>Wait!</Text> Almost Done...
            </Text>
            <Text style={styles.titleHeading2}>Please verify and complete</Text>
            <View style={styles.box}>
              <View style={{padding: 5}}>
                {/* VStack */}
                <View style={styles.VStackView}>
                  <View style={styles.HStackView}>
                    <View style={styles.parentTexfieldView}>
                      <Text style={{alignSelf: 'center'}}>
                        {english.firstName}
                      </Text>
                      <TextInput
                        style={styles.textField}
                        placeholder={english.firstName}
                        value={firstName}
                        onChangeText={handleFname}
                        editable={false}
                      />
                    </View>

                    <View style={styles.parentTexfieldView}>
                      <Text style={{alignSelf: 'center'}}>
                        {english.lstName}
                      </Text>
                      <TextInput
                        style={styles.textField}
                        placeholder={english.lstName}
                        value={lastName}
                        onChangeText={handleLname}
                        editable={false}
                      />
                    </View>
                  </View>

                  <View style={styles.HStackView}>
                    <View style={styles.parentTexfieldView}>
                      <Text style={{alignSelf: 'center'}}>
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
                            source={require('../../asset/pen.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View style={styles.HStackView}>
                    <View style={styles.parentTexfieldView}>
                      <Text style={{alignSelf: 'center'}}>
                        {english.dobText}
                      </Text>
                      <TouchableOpacity
                        onPress={() => setOpen(true)}
                        style={styles.textField}>
                        <Text
                          style={{textAlign: 'center', alignSelf: 'center'}}>
                          {dob}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.HStackView}>
                    <View style={[styles.parentTexfieldView, {flex: 1}]}>
                      <Text style={{alignSelf: 'center', color: 'transparent'}}>
                        V
                      </Text>
                      <TouchableOpacity style={styles.textField}>
                        <Text
                          style={{
                            flex: 1,
                            alignSelf: 'center',
                          }}>
                          +1
                        </Text>
                        <Image
                          style={{
                            width: 20,
                            height: 25,
                            flex: 1,
                            marginLeft: 10,
                            tintColor: Color.themeOrangeColor,
                          }}
                          source={require('../../asset/arrowDown.png')}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={[styles.parentTexfieldView, {flex: 2}]}>
                      <Text style={{alignSelf: 'center'}}>
                        Verify Mobile Number
                      </Text>
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
              maximumDate={new Date()}
              onConfirm={date => {
                setPicker(true); // check if the picker is open for the first time
                setOpen(false);
                setDate(date);
                const formattedDate = date.toLocaleDateString('en-GB'); // "DD/MM/YYYY" format
                setDob(formattedDate);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
        </ScrollView>
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
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
