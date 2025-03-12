import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Color} from '../../../Constant/Color';
import {english} from '../../../localization/english';
import {MMKV} from 'react-native-mmkv';
import NavigationStrings from '../../../Constant/NavigationStrings';
import ScreenWrapper from '../../../components/ScreenWrapper';

type OtpProps = {
  navigation: StackNavigationProp<any, typeof NavigationStrings.SIGNUP_SUCCESS>;
  route: RouteProp<any, typeof NavigationStrings.OTP>;
};

const SignUpSuccess: React.FC<OtpProps> = ({navigation, route}) => {
  const storage = new MMKV();

  useEffect(() => {
    storage.clearAll();
  });

  return (
    <ScreenWrapper isBackground={true}>
      <View style={styles.logoImageView}>
        <Image
          style={styles.logoImage}
          source={require('../../../asset/unnica_logo.png')}
        />
        <Text style={styles.welcomeText}>{english.genUsernameWelcome}</Text>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
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
});

export default SignUpSuccess;
