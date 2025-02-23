import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  Image,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import CreditCard from '../components/Card';
import PoweredBy from '../components/PoweredBy';
import {Constant, formatCardNumber, hasNotch} from '../Utils';
import {RootState} from '../redux/store';
import Topbar from '../components/TopBar';
import NFCFiled from './NFCFiled';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import {fetchNFCSec} from '../Api/NetworkManager';
import {useAppDispatch, useAppSelector} from '../hooks/reduxHooks';
import CryptoJS from 'crypto-js';
import AES from 'react-native-aes-crypto';
import {Buffer} from 'buffer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UUID from 'react-native-uuid';
import Toast from 'react-native-simple-toast';
import TouchID from 'react-native-touch-id';
import NavigationStrings from '../Constant/NavigationStrings';

type WelcomeScreenProps = StackScreenProps<
  any,
  typeof NavigationStrings.WELCOME
>;

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({navigation}) => {
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();

  const optionalConfigObject = {
    title: 'Authentication Required', // Android
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };

  const {loading, error, response} = useSelector(
    (state: RootState) => state.ApiReducer,
  );

  useEffect(() => {
    // console.log('aabsdjhabsd');
    // dispatch(fetchNFCSec());
    dispatch(fetchNFCSec());
  }, []);

  useEffect(() => {
    console.log('loading: ', loading);
  }, [loading]);

  useEffect(() => {
    console.log('response: ', response.data);

    // decryptData(
    //   'WFhwQitQRXR3ZDAxQndObysyM1Mydz09',
    //   'USymMYYWZdDxkmQYGqc+V0dO2I2O1y7bo+x5IzGxGPU=',
    //   'qtyJerluyxRlD2ClhJsbtA==',
    // );
    // getOrCreateUUID();

    // const keyBase64 = 'USymMYYWZdDxkmQYGqc+V0dO2I2O1y7bo+x5IzGxGPU=';
    // const ivBase64 = 'qtyJerluyxRlD2ClhJsbtA==';
    // const encryptedPwdBase64 = 'WFhwQitQRXR3ZDAxQndObysyM1Mydz09';

    // const key = CryptoJS.enc.Base64.parse(keyBase64);
    // const iv = CryptoJS.enc.Base64.parse(ivBase64);
    // const encryptedPwd = CryptoJS.enc.Base64.parse(encryptedPwdBase64);

    // console.log('key: ', key);
    // console.log('iv: ', iv);
    // console.log('encryptedPwd: ', encryptedPwd);

    // const decryptedPassword = decryptAES(encryptedPwd, key, iv);
    // console.log('Decrypted Password:', decryptedPassword);

    // const keyBase64 = 'USymMYYWZdDxkmQYGqc+V0dO2I2O1y7bo+x5IzGxGPU=';
    // const ivBase64 = 'qtyJerluyxRlD2ClhJsbtA==';
    // const encryptedPwdBase64 = 'WFhwQitQRXR3ZDAxQndObysyM1Mydz09';

    // // Decode Base64 strings
    // const keyBytes = Buffer.from(keyBase64, 'base64');
    // const ivBytes = Buffer.from(ivBase64, 'base64');
    // const encryptedPwdBytes = Buffer.from(encryptedPwdBase64, 'base64');

    // // Convert bytes back to string if needed
    // const keyString = keyBytes.toString('utf-8');
    // const ivString = ivBytes.toString('utf-8');
    // const encryptedPwdString = encryptedPwdBytes.toString('utf-8');

    // console.log('Decoded Key (Bytes):', keyBytes);
    // console.log('Decoded IV (Bytes):', ivBytes);
    // console.log('Decoded Encrypted Password (Bytes):', encryptedPwdBytes);

    // console.log('Decoded Key (String):', keyString);
    // console.log('Decoded IV (String):', ivString);
    // console.log('Decoded Encrypted Password (String):', encryptedPwdString);
  }, [response]);

  const decryptAES = (encryptedTextBase64: any, key: any, iv: any) => {
    const decrypted = CryptoJS.AES.decrypt(encryptedTextBase64, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    // console.log('decrypt: ', decrypted);
    return decrypted.toString(CryptoJS.enc.Utf8); // Convert bytes to string
  };

  const getOrCreateUUID = async () => {
    const existingUUID = await AsyncStorage.getItem('deviceUUID');
    if (existingUUID) {
      console.log('Existing UUID:', existingUUID);
      return existingUUID;
    } else {
      const newUUID = UUID.v4();
      await AsyncStorage.setItem('deviceUUID', newUUID);
      console.log('Generated New UUID:', newUUID);
      return newUUID;
    }
  };

  const decryptData = async (
    encryptedText: string,
    key: string,
    iv: string,
  ) => {
    try {
      // Convert base64 strings to buffers
      const keys = Buffer.from(key, 'base64');
      const ivs = Buffer.from(iv, 'base64');
      const encryptedPwd = Buffer.from(encryptedText, 'base64');

      console.log('keys: ', keys);
      console.log('ivs: ', ivs);
      console.log('encryptedPwd: ', encryptedPwd);

      // Perform AES decryption (AES-CBC, PKCS5 padding)
      const decryptedPwd = await AES.decrypt(
        encryptedPwd.toString('base64'),
        keys.toString('base64'),
        ivs.toString('base64'),
        'aes-256-cbc',
      );

      // Log the decrypted password
      console.log('Decrypted NFC Password: ', decryptedPwd);
      return decryptedPwd;
    } catch (error) {
      console.error('Error decrypting NFC password: ', error);
    }
  };

  const authenticateAndReadNFC = (
    key: string,
    iv: string,
    encryptedPwd: string,
  ) => {
    try {
      if (!key || !iv || !encryptedPwd)
        throw new Error('Missing stored credentials!');

      const keyBytes = CryptoJS.enc.Base64.parse(key);
      const ivBytes = CryptoJS.enc.Base64.parse(iv);
      const encryptedBytes = CryptoJS.enc.Base64.parse(encryptedPwd);

      console.log('Key Bytes: ', keyBytes.toString());
      console.log('IV Bytes: ', ivBytes.toString());
      console.log('Encrypted Bytes: ', encryptedBytes.toString());

      const decryptedPwd = CryptoJS.AES.decrypt(
        encryptedBytes.toString(CryptoJS.enc.Base64), // Convert to Base64 string
        keyBytes,
        {iv: ivBytes, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7},
      ).toString(CryptoJS.enc.Utf8);

      console.log('Decrypted NFC Password: ', decryptedPwd);

      if (!decryptedPwd)
        throw new Error('Decryption failed: Decrypted password is empty!');

      const tagData =
        '1JqmHZeCjywJf4xlKrLmdDYshnNaOspmsEMWchesB8fp2bdxq5yOf8WKPNZf8R0A';
      console.log('Simulated NFC Tag Data: ', tagData);
    } catch (error) {
      console.error('Error in NFC authentication: ', error);
    }
  };

  const handlePress = () => {
    navigation.navigate('Pharmacy');
  };

  async function readNdef() {
    // navigation.navigate('Pharmacy');
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      console.warn('Tag found', tag);
      // navigation.navigate('Pharmacy');

      setTimeout(() => {
        navigation.navigate('Pharmacy');
      }, 4000);

      if (tag != null) {
        throw Error('');
      }

      if (tag.ndefMessage && tag.ndefMessage.length > 0) {
        // Get the payload from the first NDEF record
        const payload = tag.ndefMessage[0].payload;
        // Decode the payload
        const languageCodeLength = payload[0];
        const text = String.fromCharCode(
          ...payload.slice(languageCodeLength + 1),
        );
        console.log('Decoded text:', text);

        Toast.show(`${text}`, Toast.LONG);
      }
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  // --------------------------------------------------------------

  const loadingFunc = () => {
    if (loading) {
      return (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    }
  };

  // --------------------------------------------------------------

  const TopText = () => {
    return (
      <View style={styles.near_accss}>
        <Text style={styles.near_acess_text}>
          Place near access touch point to unlock
        </Text>
      </View>
    );
  };

  // --------------------------------------------------------------

  const Signal_section = () => {
    return (
      <View style={[styles.signal_view]}>
        <TouchableOpacity
          onPress={() => {
            TouchID.authenticate(
              'to demo this react-native component',
              optionalConfigObject,
            )
              .then(() => {
                // Alert.alert('Authenticated Successfully');
                readNdef();
              })
              .catch(() => {
                // Alert.alert(`Authentication Failed: ${error}`);
              });
          }}
          // onPress={() => dispatch(fetchNFCSec())}
          style={styles.signal_view_touch}>
          <Image
            source={require('../asset/new/Signal.png')}
            style={styles.signal_image}
          />
          <Image
            source={require('../asset/new/Arrow.png')}
            style={styles.uploading_img}
          />
        </TouchableOpacity>
      </View>
    );
  };

  // --------------------------------------------------------------

  const CardView = () => {
    return (
      <View style={styles.card_view_vertical}>
        <View style={[styles.card_view]}>
          <Image
            source={require('../asset/left.png')}
            style={styles.left_img}
          />
          <View style={styles.absolute_img}>
            <Image
              source={require('../asset/new/visa.png')}
              style={styles.card_visa_img}
            />

            <Image
              source={require('../asset/new/num2.png')}
              style={styles.card_num_img}
            />

            <View
              style={{
                backgroundColor: Constant.backgroundColor,
                width: '100%',
                height: 30,
                marginTop: 30,
                zIndex: 10,
              }}></View>

            <View style={styles.card_customize}>
              <View style={styles.card_customize_1} />
              <View style={styles.card_customize_2} />
            </View>
          </View>
          <Image
            source={require('../asset/right.png')}
            style={styles.right_img}
          />
        </View>
        <Text style={styles.slideText}>Slide to change payment method</Text>
      </View>
    );
  };

  // --------------------------------------------------------------

  return (
    <View style={styles.container}>
      {loading && loadingFunc()}
      <Topbar isTitle={false} topBarStyle={{marginTop: hasNotch() ? 40 : 0}} />
      <TopText />
      <Signal_section />
      <CardView />

      {/* <NFCFiled /> */}
    </View>
  );
};

// --------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.backgroundColor,
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999, // Ensure the overlay is on top of other components
  },
  right_img: {
    width: '15%',
    resizeMode: 'contain',
    marginLeft: 20,
    tintColor: Constant.themeYellowColor,
  },

  card_customize: {
    backgroundColor: 'gray',
    width: '100%',
    height: 10,
    marginTop: 30,
    flexDirection: 'row',
  },

  card_customize_1: {
    backgroundColor: Constant.backgroundColor,
    width: 30,
    marginLeft: 30,
    borderRadius: 20,
  },

  card_customize_2: {
    backgroundColor: Constant.backgroundColor,
    width: 55,
    marginLeft: 10,
    borderRadius: 20,
  },

  left_img: {
    width: '15%',
    resizeMode: 'contain',
    marginLeft: 10,
    tintColor: Constant.themeYellowColor,
    marginRight: 20,
  },

  absolute_img: {
    width: '65%',
    height: 130,
    backgroundColor: 'gray',
    borderRadius: 20,
    position: 'relative',
  },

  card_visa_img: {
    width: 70,
    height: 70,
    position: 'absolute',
    top: -35,
    left: -35,
    zIndex: 11,
  },

  card_num_img: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -40,
    bottom: -50,
    zIndex: 11,
    resizeMode: 'contain',
  },

  near_accss: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 30,
    height: 100,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  near_acess_text: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    fontWeight: '400',
  },
  signal_view: {
    alignSelf: 'center',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },

  signal_view_touch: {
    alignSelf: 'center',
    flexDirection: 'column',
    width: '70%',
    alignItems: 'center',
  },
  card_view_vertical: {
    alignSelf: 'center',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    marginTop: 20,
  },
  card_view: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    height: 200,
  },
  slideText: {
    fontSize: 17,
    color: 'white',
    textAlign: 'center',
    fontWeight: '400',
  },

  signal_image: {
    width: '70%',
    resizeMode: 'contain',
    height: 170,
  },
  uploading_img: {
    width: '25%',
    resizeMode: 'contain',
    height: 50,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 30,
    marginTop: 20,
    marginHorizontal: 20,
  },
  slide_view: {},
  imageContainer: {
    alignSelf: 'center',
    marginTop: 30,
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
  poweredBy: {
    position: 'absolute',
    bottom: 20,
    right: 10,
  },
});

export default WelcomeScreen;
