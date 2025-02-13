import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ViewStyle,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';

interface TopBarProps {
  topBarStyle?: ViewStyle;
  isTitle: Boolean;
  openDrawer?: () => void;
  openLogo?: () => void;
}

const Topbar: React.FC<TopBarProps> = ({
  topBarStyle,
  isTitle,
  openDrawer,
  openLogo,
}) => (
  <View style={[styles.container, topBarStyle]}>
    <TouchableOpacity
      onPress={openLogo}
      style={[
        styles.logo,
        {justifyContent: 'center', alignContent: 'center', alignSelf: 'center'},
      ]}>
      <Image
        style={{width: '60%', resizeMode: 'contain', alignSelf: 'center'}}
        source={require('../asset/new/Logo.png')}
      />
    </TouchableOpacity>
    {isTitle ? (
      <Image
        source={require('../asset/new/Store.png')}
        style={styles.centerLogo}
      />
    ) : null}
    <TouchableOpacity onPress={openDrawer} style={styles.menuIconTouchable}>
      <Image
        source={require('../asset/new/Menu.png')}
        style={styles.menuIcon}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 90,
    backgroundColor: '#1A1A1A',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 15,
  },
  logo: {
    alignSelf: 'center',
    width: '20%',
    height: 55,
    resizeMode: 'contain',
  },
  centerLogo: {
    alignSelf: 'center',
    width: '40%',
    height: 60,
    borderRadius: 30,
    // resizeMode: 'contain',
  },
  menuIconTouchable: {
    alignSelf: 'center',
    width: '20%',
    height: 25,
    resizeMode: 'contain',
  },
  menuIcon: {
    alignSelf: 'center',
    width: '40%',
    height: 25,
    resizeMode: 'contain',
  },
});

export default Topbar;
