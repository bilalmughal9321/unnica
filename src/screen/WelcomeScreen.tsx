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
} from 'react-native';
import {useSelector} from 'react-redux';

import CreditCard from '../components/Card';
import PoweredBy from '../components/PoweredBy';
import {Constant, formatCardNumber, hasNotch} from '../Utils';
import {RootState} from '../redux/store';
import Topbar from '../components/TopBar';
import NFCFiled from './NFCFiled';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';

type WelcomeScreenProps = StackScreenProps<any, 'Welcome'>;

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({navigation}) => {
  // Access card details from the Redux store

  const details = useSelector(
    (state: RootState) => state.cardReducer.cardDetails,
  );

  useEffect(() => {}, [details]);

  const handlePress = () => {
    navigation.navigate('Pharmacy');
  };

  async function readNdef() {
    navigation.navigate('Pharmacy');
    // try {
    //   // register for the NFC tag with NDEF in it
    //   await NfcManager.requestTechnology(NfcTech.Ndef);
    //   // the resolved tag object will contain `ndefMessage` property
    //   const tag = await NfcManager.getTag();
    //   console.warn('Tag found', tag);
    //   navigation.navigate('Pharmacy');
    // } catch (ex) {
    //   console.warn('Oops!', ex);
    // } finally {
    //   // stop the nfc scanning
    //   NfcManager.cancelTechnologyRequest();
    // }
  }

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
          onPress={() => readNdef()}
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
