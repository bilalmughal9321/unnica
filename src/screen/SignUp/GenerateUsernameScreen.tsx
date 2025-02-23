import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import NavigationStrings from '../../Constant/NavigationStrings';
import ScreenWrapper from '../../components/ScreenWrapper';
import {Color} from '../../Constant/Color';
import {english} from '../../localization/english';
import DatePicker from 'react-native-date-picker';

type GeneratedUsernameProps = {
  navigation: StackNavigationProp<
    any,
    typeof NavigationStrings.GENERATE_USERNAME
  >;
};

const GenerateUsernameScreen: React.FC<GeneratedUsernameProps> = ({
  navigation,
}) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [number, setNumber] = useState('');
  const [dob, setDob] = useState('');
  const [code, setCode] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoggedIn(false);
    const timer = setTimeout(() => {
      setLoggedIn(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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

  const generateRandomUsername = useCallback(() => {
    console.log(firstName);
    console.log(lastName);
    if (firstName && lastName) {
      const randomNum = Math.floor(Math.random() * 10000) + 1;
      setUsername(`${firstName}_${lastName}_${randomNum}`);
    }
  }, [firstName, lastName]);

  const handleFname = (props: any) => {
    setFirstName(props);
  };

  // const handleFname = useCallback((props: any) => {
  //   console.log('sss: ', props.text);
  //   setFirstName(props.text);
  // }, []);

  const handleLname = useCallback((props: any) => {
    setLastName(props);
  }, []);

  const handleUsername = useCallback((props: any) => {
    setFirstName(props);
  }, []);

  const handleCode = useCallback((props: any) => {
    setCode(props.x);
  }, []);

  const handleDob = useCallback((props: any) => {
    setDob(props.x);
  }, []);

  const UserNameView = () => {
    return (
      <View style={styles.container}>
        <Text style={{color: 'white', fontWeight: '500', fontSize: 25}}>
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
                  <Text style={{alignSelf: 'center'}}>{english.firstName}</Text>
                  <TextInput
                    style={styles.textField}
                    placeholder={english.firstName}
                    value={firstName}
                    onChangeText={handleFname}
                  />
                </View>

                <View style={styles.parentTexfieldView}>
                  <Text style={{alignSelf: 'center'}}>{english.lstName}</Text>
                  <View style={styles.textField}>
                    <TextInput
                      style={styles.textField}
                      placeholder={english.lstName}
                      value={lastName}
                      onChangeText={handleLname}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.HStackView}>
                <View style={styles.parentTexfieldView}>
                  <Text style={{alignSelf: 'center'}}>{english.username}</Text>
                  <View style={styles.textField}>
                    <TextInput
                      style={styles.textField}
                      placeholder={english.username}
                      value={username}
                      onChangeText={handleUsername}
                    />
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
                  <Text style={{alignSelf: 'center'}}>{english.dobText}</Text>
                  <TouchableOpacity
                    onPress={() => setOpen(true)}
                    style={styles.textField}>
                    <Text style={{textAlign: 'center'}}></Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.HStackView}>
                <View style={[styles.parentTexfieldView, {flex: 1}]}>
                  <Text style={{alignSelf: 'center', color: 'transparent'}}>
                    V
                  </Text>
                  <TextInput
                    style={styles.textField}
                    placeholder={english.number}
                    value={number}
                    onChangeText={handleCode}
                  />
                </View>

                <View style={[styles.parentTexfieldView, {flex: 2}]}>
                  <Text style={{alignSelf: 'center'}}>
                    Verify Mobile Number
                  </Text>
                  <TextInput
                    style={styles.textField}
                    placeholder={english.number}
                    value={number}
                    onChangeText={handleDob}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.confirmPwd}>
          <Text style={styles.confirmPwdText}>{english.signUpSubmitBtn}</Text>
        </TouchableOpacity>

        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
    );
  };

  return (
    <ScreenWrapper isBackground>
      {isLoggedIn ? <UserNameView /> : <ImageLogo />}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 10,
  },
  label: {fontSize: 18, fontWeight: 'bold'},
  username: {fontSize: 20, color: 'blue', marginVertical: 10},

  // logo image

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
    width: '90%',
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
    flexDirection: 'column',
    gap: 5,
    flex: 1,
  },
  textField: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Color.textFieldColor,
    padding: 12,
    borderRadius: 20,
    // height: 50,
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
