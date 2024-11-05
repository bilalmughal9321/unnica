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
import {Constant, formatCardNumber, hasNotch, normalize} from '../Utils';
import {RootState} from '../redux/store';
import Topbar from '../components/TopBar';

type CartScreenProps = StackScreenProps<any, 'Cart'>;

const CartScreen: React.FC<CartScreenProps> = ({navigation}) => {
  // Access card details from the Redux store

  const details = useSelector(
    (state: RootState) => state.cardReducer.cardDetails,
  );

  useEffect(() => {}, [details]);

  const handlePress = () => {
    navigation.navigate('Pharmacy');
  };

  // --------------------------------------------------------------

  interface TopTextProps {
    text: string;
    price: string;
  }

  const TopText: React.FC<TopTextProps> = ({text, price}) => {
    return (
      <View style={[styles.near_accss, {marginTop: 0}]}>
        <Text
          style={[styles.near_acess_text, {fontSize: 17, fontWeight: '700'}]}>
          {text}
        </Text>
        <Text style={styles.near_acess_text}>${price}</Text>
      </View>
    );
  };

  const TopText2: React.FC<TopTextProps> = ({text, price}) => {
    return (
      <View
        style={[
          styles.near_accss,
          {backgroundColor: Constant.backgroundColor, height: 60, marginTop: 0},
        ]}>
        <Text
          style={[styles.near_acess_text, {fontSize: 17, fontWeight: '700'}]}>
          {text}
        </Text>
        <Text style={styles.near_acess_text}>${price}</Text>
      </View>
    );
  };

  // --------------------------------------------------------------

  const Signal_section = () => {
    return (
      <View style={[styles.signal_view]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Pharmacy')}
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
        <Text style={styles.slideText}>
          Place near access touch point to unlock
        </Text>
      </View>
    );
  };

  // --------------------------------------------------------------

  interface bottomBarProps {
    price: string;
  }

  const BottomBar: React.FC<bottomBarProps> = ({price}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Cart')}
        style={{
          height: 90,
          backgroundColor: Constant.backgroundColor, // Change this color as needed
          position: 'absolute',
          bottom: 0, // Positioning at the bottom
          left: 0,
          right: 0,
          // iOS shadow properties
          shadowColor: 'black',
          shadowOffset: {width: 0, height: -10},
          shadowRadius: 5,
          shadowOpacity: 0.5,
          // Android elevation property
          elevation: 5, // Adjust this value for more or less shadow
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Image
          source={require('../asset/new/Addeditem.png')}
          style={{
            height: 55,
            padding: 0,
            marginLeft: 30,
            flex: 1.4,
            resizeMode: 'contain',
          }}
        />

        <Text
          style={{
            color: 'white',
            fontWeight: '600',
            fontSize: normalize(20),
            flex: 4.5,
            // backgroundColor: 'red',
            left: 20,
          }}>
          Your balance
        </Text>

        <Text
          style={{
            color: 'white',
            fontWeight: '400',
            fontSize: normalize(25),
            flex: 4.5,
            textAlign: 'right',
            marginRight: 30,
            // backgroundColor: 'red',
          }}>
          ${price}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Topbar isTitle={false} topBarStyle={{marginTop: hasNotch() ? 40 : 0}} />
      <TopText text="Thoothpaste mini" price="2.40" />
      <TopText2 text="Cleaning face mask" price="4.40" />
      <TopText text="Shampoo Tio Nacho" price="5.40" />
      {/* <Signal_section />
      <CardView /> */}

      <BottomBar price="11.20" />
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
    marginTop: 20,
    height: 60,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  near_acess_text: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    fontWeight: '400',
    // marginLeft: 10,
    // width: '90%',
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

export default CartScreen;
