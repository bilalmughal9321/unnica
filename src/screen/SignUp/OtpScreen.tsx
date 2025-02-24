import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import NavigationStrings from '../../Constant/NavigationStrings';
import ScreenWrapper from '../../components/ScreenWrapper';

type OtpProps = {
  navigation: StackNavigationProp<any, typeof NavigationStrings.OTP>;
};

const OtpScreen: React.FC<OtpProps> = ({navigation}) => {
  const otpLength = 4;
  const [otp, setOtp] = useState(Array(otpLength).fill(''));
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (text: string, index: number) => {
    if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    console.log('Resend OTP clicked');
  };

  return (
    <ScreenWrapper isBackground={true}>
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
                    onKeyPress={({nativeEvent}) => {
                      if (nativeEvent.key === 'Backspace') {
                        handleBackspace(value, index);
                      }
                    }}
                  />
                ))}
              </View>
              <Text style={styles.infoText}>
                Verification code sent to +1 ### - ### - ####
              </Text>
              <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendText}>
                  <Text style={styles.resendText2}>
                    Did not receive OTP Code?
                  </Text>
                  {'  '}
                  Resend code
                </Text>
              </TouchableOpacity>
            </View>
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
});

export default OtpScreen;
