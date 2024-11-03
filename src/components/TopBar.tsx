import React from 'react';
import {View, Image, StyleSheet, ViewStyle} from 'react-native';

interface TopBarProps {
  topBarStyle?: ViewStyle;
}

const Topbar: React.FC<TopBarProps> = ({topBarStyle}) => (
  <View style={[styles.container, topBarStyle]}>
    <Image source={require('../asset/new/Logo.png')} style={styles.logo} />
    <Image source={require('../asset/new/Menu.png')} style={styles.menuIcon} />
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
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 15,
  },
  logo: {
    alignSelf: 'center',
    width: '20%',
    height: 55,
    resizeMode: 'contain',
  },
  menuIcon: {
    alignSelf: 'center',
    width: '20%',
    height: 25,
    resizeMode: 'contain',
  },
});

export default Topbar;