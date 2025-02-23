import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import NavigationStrings from '../../Constant/NavigationStrings';
import {RootStackParamList} from '../../Constant/RootStackParamList';
import ScreenWrapper from '../../components/ScreenWrapper';
import {Color} from '../../Constant/Color';
import FooterText from '../../components/Footer';
import {english} from '../../localization/english';

type SignUpProps = {
  navigation: StackNavigationProp<any, typeof NavigationStrings.SIGNUP>;
};

const SignupFormScreen: React.FC<SignUpProps> = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNext = () => {
    if (firstName.trim() && lastName.trim()) {
      navigation.navigate('GenerateUsername', {firstName, lastName});
    } else {
      Alert.alert('Please enter your first and last name');
    }
  };

  return (
    <ScreenWrapper isBackground={false}>
      <View style={styles.container}>
        <Image
          style={styles.titleImage}
          source={require('../../asset/unnica_logo.png')}
        />

        <View style={styles.box}>
          {/* Signup Text */}
          <View style={styles.textWrapper}>
            <Text style={styles.text}>{english.signTitle}</Text>
          </View>
          <View style={{padding: 5}}>
            {/* VStack */}
            <View style={styles.VStackView}>
              <View style={styles.HStackView}>
                <TextInput
                  style={styles.textField}
                  placeholder={english.firstName}
                  value={firstName}
                  onChangeText={text => setFirstName(text)}
                />

                <TextInput
                  style={styles.textField}
                  placeholder={english.lstName}
                  value={lastName}
                  onChangeText={text => setLastName(text)}
                />
              </View>

              <View style={styles.HStackView}>
                <TextInput
                  style={styles.textField}
                  placeholder={english.email}
                  value={email}
                  onChangeText={text => setEmail(text)}
                />
              </View>

              <View style={styles.HStackView}>
                <TextInput
                  style={styles.textField}
                  placeholder={english.password}
                  value={password}
                  secureTextEntry
                  onChangeText={text => setPassword(text)}
                />
              </View>

              <View style={styles.HStackView}>
                <TextInput
                  style={styles.textField}
                  placeholder={english.confirmPassword}
                  value={confirmPassword}
                  secureTextEntry
                  onChangeText={text => setConfirmPassword(text)}
                />
              </View>
            </View>

            {/* HStack */}
          </View>
        </View>

        <TouchableOpacity style={styles.confirmPwd}>
          <Text style={styles.confirmPwdText}>{english.signUpSubmitBtn}</Text>
        </TouchableOpacity>

        <FooterText />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  titleImage: {
    width: '60%',
    height: 260,
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
    position: 'relative', // Required for absolute positioning inside
  },
  textWrapper: {
    position: 'absolute',
    top: -10, // Moves text above the box
    alignSelf: 'center',
    // left: '50%',
    // transform: [{translateX: -0}], // Centers the text
    backgroundColor: 'white', // Hides border behind text
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
    // height: 50,
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
