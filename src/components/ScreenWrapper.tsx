import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';

const bgImage = require('../asset/background.png'); // Replace with your image path

const ScreenWrapper = ({
  children,
  isBackground = false,
}: {
  children: React.ReactNode;
  isBackground: boolean;
}) => {
  return isBackground ? (
    <ImageBackground source={bgImage} style={styles.background}>
      {children}
    </ImageBackground>
  ) : (
    <View style={[styles.background, styles.whiteBackground]}>{children}</View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  whiteBackground: {
    backgroundColor: 'white',
  },
});

export default ScreenWrapper;
