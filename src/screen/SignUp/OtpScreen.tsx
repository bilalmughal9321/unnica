// import React, {useEffect, useRef, useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import {RouteProp, useNavigation} from '@react-navigation/native';
// import {StackNavigationProp} from '@react-navigation/stack';
// import NavigationStrings from '../../Constant/NavigationStrings';
// import ScreenWrapper from '../../components/ScreenWrapper';
// import {MMKV} from 'react-native-mmkv';
// import {useDispatch, useSelector} from 'react-redux';
// import {AppDispatch, RootState} from '../../redux/store';
// import {fetchApiData} from '../../redux/actions';
// import {loader} from '../../components/Loader';
// import {formatDate, formatUSPhoneNumber, toaster} from '../../Utils';

// type OtpProps = {
//   navigation: StackNavigationProp<any, typeof NavigationStrings.OTP>;
//   route: RouteProp<any, typeof NavigationStrings.OTP>;
// };

// const OtpScreen: React.FC<OtpProps> = ({navigation, route}) => {
//   const otpLength = 4;
//   const [otp, setOtp] = useState(Array(otpLength).fill(''));
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const inputRefs = useRef<Array<TextInput | null>>([]);

//   const [getFn, setFn] = useState();
//   const [getLn, setLn] = useState('');
//   const [getEmail, setEmail] = useState('');
//   const [getPwd, setPwd] = useState('');
//   const [getUser, setUser] = useState('');
//   const [getNumber, setNumber] = useState('');
//   const [getdob, setDOB] = useState('Click to add dob');

//   const dispatch = useDispatch<AppDispatch>();
//   const {load, data, err} = useSelector((state: RootState) => state.Unnica);

//   const storage = new MMKV();

//   const {fn, ln, email, password, username, dob, Number} = route.params || {};

//   useEffect(() => {
//     let step = storage.getNumber('Step');
//     let user = storage.getString('USER_DATA');
//     if (user) {
//       let response = JSON.parse(user);
//       console.log('response: ', response);

//       const {fn, ln, email, password, username, fullNumber, dob} = response;

//       setFn(fn);
//       setLn(ln);
//       setEmail(email);
//       setPwd(password);
//       setUser(username);
//       setNumber(fullNumber);
//       setDOB(dob);
//       setPhoneNumber(fullNumber);

//       otpHandling(fullNumber);
//     }
//   }, []);

//   useEffect(() => {
//     if (data.VERIFY_OTP != null) {
//       console.log('data.VERIFY_OTP: ', data.VERIFY_OTP);
//       const otpArray = data.VERIFY_OTP.data.split('');
//       setOtp(otpArray);
//       handleCompleteOtp(otpArray);
//     }
//   }, [data.VERIFY_OTP]);

//   useEffect(() => {
//     if (data.SIGNUP != null) {
//       toaster('account has been created');
//       navigation.navigate(NavigationStrings.SIGNUP_SUCCESS);
//     }
//   }, [data.SIGNUP]);

//   const otpHandling = (props: string) => {
//     if (props == '') {
//       return;
//     }

//     toaster('Get otp');

//     dispatch(
//       fetchApiData(
//         'SEND_OTP',
//         'http://api.ci.unnica-dev.co/user/send-otp',
//         'POST',
//         {
//           phone: props,
//         },
//       ),
//     );

//     const encodedPhone = encodeURIComponent(props);

//     const timer = setTimeout(() => {
//       toaster('verify otp');
//       dispatch(
//         fetchApiData(
//           'VERIFY_OTP',
//           `http://api.ci.unnica-dev.co/admin/otp?phone=${encodedPhone}`,
//           'GET',
//         ),
//       );
//     }, 5000);
//     return () => clearTimeout(timer);
//   };

//   const handleCompleteOtp = (props: Array<string>) => {
//     const allFilled = props.every(item => item !== '');
//     if (allFilled) {
//       const timer = setTimeout(() => {
//         handleSignp(props);
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   };

//   const handleSignp = (props: Array<string>) => {
//     if (
//       !getFn ||
//       !getLn ||
//       !getEmail ||
//       !getPwd ||
//       !getUser ||
//       !getdob ||
//       !phoneNumber
//     ) {
//       toaster('Some required fields are missing!');
//     } else {
//       const otp = props.join('');
//       const request = {
//         firstName: getFn,
//         lastName: getLn,
//         email: getEmail,
//         username: getUser,
//         dob: getdob,
//         phone: phoneNumber,
//         otp: otp,
//         isSocial: false,
//       };

//       dispatch(
//         fetchApiData(
//           'SIGNUP',
//           `http://api.ci.unnica-dev.co/user/signup?p=1`,
//           'POST',
//           {
//             firstName: getFn,
//             lastName: getLn,
//             email: getEmail,
//             username: getUser,
//             dob: '02/28/2025',
//             phone: phoneNumber,
//             otp: otp,
//             isSocial: false,
//           },
//         ),
//       );
//     }
//   };

//   const handleChange = (text: string, index: number) => {
//     if (text.length > 1) return;

//     const newOtp = [...otp];
//     newOtp[index] = text;
//     setOtp(newOtp);
//     handleCompleteOtp(newOtp);

//     // console.log(newOtp);

//     if (text && index < otpLength - 1) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleBackspace = (text: string, index: number) => {
//     if (!text && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handleResend = () => {
//     console.log('Resend OTP clicked');

//     otpHandling(phoneNumber);
//   };

//   return (
//     <ScreenWrapper isBackground={true}>
//       {load && loader()}
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.flex}>
//         <ScrollView contentContainerStyle={styles.scrollContainer}>
//           <View style={styles.container}>
//             <Text style={styles.title}>Verify your number</Text>
//             <View style={styles.card}>
//               <View style={styles.otpContainer}>
//                 {otp.map((value, index) => (
//                   <TextInput
//                     key={index}
//                     ref={ref => (inputRefs.current[index] = ref)}
//                     style={styles.input}
//                     keyboardType="numeric"
//                     maxLength={1}
//                     value={value}
//                     onChangeText={text => handleChange(text, index)}
//                     onKeyPress={({nativeEvent}) => {
//                       if (nativeEvent.key === 'Backspace') {
//                         handleBackspace(value, index);
//                       }
//                     }}
//                   />
//                 ))}
//               </View>
//               <Text style={styles.infoText}>
//                 Verification code sent to {formatUSPhoneNumber(phoneNumber)}
//               </Text>
//               <TouchableOpacity onPress={handleResend}>
//                 <Text style={styles.resendText}>
//                   <Text style={styles.resendText2}>
//                     Did not receive OTP Code?
//                   </Text>
//                   {'  '}
//                   Resend code
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </ScreenWrapper>
//   );
// };

// const styles = StyleSheet.create({
//   flex: {
//     flex: 1,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 20,
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 20,
//   },
//   backButtonContainer: {
//     position: 'absolute',
//     top: 40, // Adjust as needed
//     left: 20, // Adjust as needed
//     zIndex: 10, // Keep it above all components
//   },
//   backButton: {
//     width: 30,
//     height: 30,
//     resizeMode: 'contain',
//   },
//   card: {
//     flexDirection: 'column',
//     backgroundColor: '#fff',
//     padding: 20,
//     paddingVertical: 40,
//     borderRadius: 15,
//     alignItems: 'center',
//     width: '90%',
//     elevation: 5,
//     gap: 20,
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 15,
//     gap: 10,
//   },
//   input: {
//     width: 40,
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 20,
//     textAlign: 'center',
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginHorizontal: 5,
//     backgroundColor: '#F0F0F0',
//   },
//   infoText: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 5,
//   },
//   resendText: {
//     fontSize: 14,
//     color: '#007bff',
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   resendText2: {
//     fontSize: 14,
//     color: 'gray',
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
// });

// export default OtpScreen;

import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  AppState,
} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import NavigationStrings from '../../Constant/NavigationStrings';
import ScreenWrapper from '../../components/ScreenWrapper';
import {MMKV} from 'react-native-mmkv';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {
  apiRequest,
  endLoader,
  fetchApiData,
  startLoader,
} from '../../redux/actions';
import {loader} from '../../components/Loader';
import {formatUSPhoneNumber, toaster} from '../../Utils';
import {API_ACTIONS} from '../../Constant/apiActionTypes';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {english} from '../../localization/english';
import {Color} from '../../Constant/Color';

type OtpProps = {
  navigation: StackNavigationProp<any, typeof NavigationStrings.OTP>;
  route: RouteProp<any, typeof NavigationStrings.OTP>;
};

const OtpScreen: React.FC<OtpProps> = ({navigation, route}) => {
  const otpLength = 4;
  const [otp, setOtp] = useState(Array(otpLength).fill(''));
  const [phoneNumber, setPhoneNumber] = useState('');
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const [getFn, setFn] = useState();
  const [getLn, setLn] = useState('');
  const [getEmail, setEmail] = useState('');
  const [getPwd, setPwd] = useState('');
  const [getUser, setUser] = useState('');
  const [getNumber, setNumber] = useState('');
  const [getdob, setDOB] = useState('Click to add dob');
  const [getToken, setToken] = useState('');
  const [appState, setAppState] = useState(AppState.currentState);

  const dispatch = useDispatch<AppDispatch>();
  const {load, data} = useSelector((state: RootState) => state.Unnica);

  const storage = new MMKV();

  useEffect(() => {
    let user = storage.getString('USER_DATA');
    if (user) {
      let response = JSON.parse(user);
      const {fn, ln, email, password, username, fullNumber, dob} = response;
      setFn(fn);
      setLn(ln);
      setEmail(email);
      setPwd(password);
      setUser(username);
      setNumber(fullNumber);
      setDOB(dob);
      setPhoneNumber(fullNumber);
      otpHandling(fullNumber);
      signUp(email, password);

      let users = {
        fn: fn,
        ln: ln,
        email: email,
        password: password,
        username: username,
        fullNumber: fullNumber,
        dob: dob,
      };
      console.log(users);
    }
  }, []);

  useEffect(() => {
    if (data.VERIFY_OTP) {
      const otpArray = data.VERIFY_OTP.data.split('');
      setOtp(otpArray);
      // let firebasetoken = signUp(getEmail, getPwd);

      // handleCompleteOtp(otpArray, firebasetoken.token);
    }
  }, [data.VERIFY_OTP]);

  useEffect(() => {
    if (appState == 'background') {
      signInAndDeleteUser(getEmail, getPwd);
    } else if (appState == 'active') {
      signUp(getEmail, getPwd);
    }
  }, [appState]);

  useEffect(() => {
    if (data.SIGNUP) {
      toaster('Account has been created');
      navigation.reset({
        index: 0, // Set index to 1 (0-based index), keeping Splash at index 0 and Screen1 at index 1
        routes: [{name: NavigationStrings.SIGNIN}],
      });
    }
  }, [data.SIGNUP]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      console.log('App State Changed: ', nextAppState);

      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    dispatch(startLoader());
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const idToken = await userCredential.user.getIdToken(); // Get ID Token
      // console.log(userCredential.user);
      console.log(idToken);
      setToken(idToken);

      dispatch(endLoader());
      // return {user: userCredential.user, token: idToken};
    } catch (error) {
      throw error;
    }
  };

  const signInAndDeleteUser = async (email: string, password: string) => {
    dispatch(startLoader());
    try {
      const user = await signInUser(email, password); // Step 1: Sign In
      await deleteUser(user); // Step 2: Delete User
    } catch (error) {
      dispatch(endLoader());
      console.error('Operation failed:', error);
    }
  };

  const signInUser = async (email: string, password: string) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      console.log('User signed in successfully:', userCredential.user.email);
      return userCredential.user; // Return user object
    } catch (error) {
      dispatch(endLoader());
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const deleteUser = async (user: FirebaseAuthTypes.User) => {
    try {
      if (user) {
        await user.delete(); // Delete user
        dispatch(endLoader());
        console.log('User deleted successfully!');
      } else {
        dispatch(endLoader());
        console.log('No user is logged in.');
      }
    } catch (error) {
      dispatch(endLoader());
      console.error('Error deleting user:', error);
    }
  };

  const otpHandling = (phone: string) => {
    if (!phone) return;
    toaster('Get OTP');
    dispatch(
      fetchApiData(
        API_ACTIONS.SEND_OTP,
        'http://api.ci.unnica-dev.co/user/send-otp',
        'POST',
        {phone},
      ),
    );
    const timer = setTimeout(() => {
      toaster('Verify OTP');
      dispatch(
        fetchApiData(
          API_ACTIONS.VERIFY_OTP,
          `http://api.ci.unnica-dev.co/admin/otp?phone=${encodeURIComponent(
            phone,
          )}`,
          'GET',
        ),
      );
    }, 5000);
    return () => clearTimeout(timer);
  };

  const handleCompleteOtp = (otpArray: Array<string>, token: string | null) => {
    if (otpArray.every(item => item !== '')) {
      setTimeout(() => handleSignup(), 4000);
    }
  };

  const handleSignup = () => {
    if (
      !getFn ||
      !getLn ||
      !getEmail ||
      !getPwd ||
      !getUser ||
      !getdob ||
      !phoneNumber
    ) {
      toaster('Some required fields are missing');
    } else {
      dispatch(
        fetchApiData(
          'SIGNUP',
          `http://api.ci.unnica-dev.co/user/signup?p=3`,
          'POST',
          {
            firstName: getFn,
            lastName: getLn,
            email: getEmail,
            username: getUser,
            dob: getdob,
            phone: phoneNumber,
            otp: otp.join(''),
            idToken: getToken,
            isSocial: false,
          },
        ),
      );
    }
  };

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    const otpArray = newOtp[index].split('');
    setOtp(newOtp);
    if (text && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <ScreenWrapper isBackground={true}>
      {load && loader()}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.title}>Verify your number</Text>
            <View style={styles.card}>
              <View style={styles.otpContainer}>
                {otp.map((value, index) => (
                  <TextInput
                    key={index}
                    ref={ref => (inputRefs.current[index] = ref)}
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={1}
                    value={value}
                    onChangeText={text => handleChange(text, index)}
                  />
                ))}
              </View>
              <Text style={styles.infoText}>
                Verification code sent to {formatUSPhoneNumber(phoneNumber)}
              </Text>
              <TouchableOpacity onPress={() => otpHandling(phoneNumber)}>
                <Text style={styles.resendText}>
                  Did not receive OTP Code?{' '}
                  <Text style={styles.resendText2}>Resend code</Text>
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleSignup} style={styles.confirmPwd}>
              <Text style={styles.confirmPwdText}>
                {english.signUpSubmitBtn}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 40, // Adjust as needed
    left: 20, // Adjust as needed
    zIndex: 10, // Keep it above all components
  },
  backButton: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  card: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 20,
    paddingVertical: 40,
    borderRadius: 15,
    alignItems: 'center',
    width: '90%',
    elevation: 5,
    gap: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    gap: 10,
  },
  input: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 5,
    backgroundColor: '#F0F0F0',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  resendText: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold',
    marginTop: 10,
  },
  resendText2: {
    fontSize: 14,
    color: 'gray',
    fontWeight: 'bold',
    marginTop: 10,
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

export default OtpScreen;
