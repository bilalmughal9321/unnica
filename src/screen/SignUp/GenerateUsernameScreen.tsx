import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import NavigationStrings from '../../Constant/NavigationStrings';
import ScreenWrapper from '../../components/ScreenWrapper';
import {Color} from '../../Constant/Color';
import {english} from '../../localization/english';

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

  useEffect(() => {
    setLoggedIn(false);
    const timer = setTimeout(() => {
      // navigation.navigate(NavigationStrings.GENERATE_USERNAME);
      setLoggedIn(false);
    }, 5000);
    // Clear timeout on component unmount
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

  return (
    <ScreenWrapper isBackground>
      <ImageLogo />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
});

export default GenerateUsernameScreen;
