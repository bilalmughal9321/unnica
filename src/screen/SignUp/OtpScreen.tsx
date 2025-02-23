import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import NavigationStrings from '../../Constant/NavigationStrings';

type OtpProps = {
  navigation: StackNavigationProp<any, typeof NavigationStrings.OTP>;
};

const OtpScreen: React.FC<OtpProps> = ({navigation}) => {
  const route = useRoute();
  const {username} = route.params as {username: string};

  const [otp, setOtp] = useState('');

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      Alert.alert('Success', 'OTP Verified Successfully!');
      // Navigate to the next screen (e.g., Home or Dashboard)
      navigation.navigate('Welcome');
    } else {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>OTP sent to {username}:</Text>
      <TextInput
        style={styles.input}
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        maxLength={6}
        placeholder="Enter OTP"
      />
      <Button title="Verify OTP" onPress={handleVerifyOtp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {fontSize: 16, fontWeight: 'bold', marginBottom: 10},
  input: {
    borderWidth: 1,
    padding: 10,
    width: '80%',
    marginBottom: 15,
    textAlign: 'center',
    borderRadius: 5,
  },
});

export default OtpScreen;
