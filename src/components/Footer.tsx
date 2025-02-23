import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {english} from '../localization/english';

const FooterText = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{english.pweredByText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20, // Distance from bottom
    alignSelf: 'center', // Center horizontally
  },
  text: {
    fontSize: 14,
    color: 'gray',
    fontWeight: '400',
  },
});

export default FooterText;
