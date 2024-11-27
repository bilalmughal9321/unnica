import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Text,
  Animated,
  Easing,
  ScrollView,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
// import IconBadge from 'react-native-icon-badge';
// import FooterBack from '../components/FooterBack';
import {StackScreenProps, StackNavigationProp} from '@react-navigation/stack';
import {styles} from '../../style';
import CreditCard from '../components/Card';
import SlideToConfirm from '../components/Slide';
import ImageWithBadge from '../components/ImageBadge';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import CountdownTimer from '../components/CountTimer';
import {Constant, formatCardNumber, hasNotch, normalize} from '../Utils';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import Topbar from '../components/TopBar';
import CountdownCircle from '../components/CountdownCircle';
import SocketService from '../components/SocketService';

// type PharmacyScreenProps = StackScreenProps<any, 'Pharmacy'>;
type SecondScreenProps = {
  navigation: StackNavigationProp<any>;
};

const socketUrl = 'ws://api.ci.unnica-dev.co/ws';

const PharmacyScreen: React.FC<SecondScreenProps> = ({navigation}) => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(true); // For expanding/collapsing timer
  const [remainingTime, setRemainingTime] = useState<number>(0); // Timer's remaining time state

  const widthAnim = useRef(new Animated.Value(200)).current; // Initial width for small rectangle
  const heightAnim = useRef(new Animated.Value(200)).current; // Initial height
  const arrowRotation = useRef(new Animated.Value(0)).current; // To rotate arrow icon

  // ------------------------------------------------------------------------------------

  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const socketService = new SocketService(socketUrl);

  // ------------------------------------------------------------------------------------

  const details = useSelector(
    (state: RootState) => state.cardReducer.cardDetails,
  ); // State ko access karein
  const dispatch = useDispatch();

  let interval: NodeJS.Timeout | null = null;

  useEffect(() => {
    // Timer will run in the background
    // TimeOutinit();

    socketService.connect(
      '1JqmHZeCjywJf4xlKrLmdDYshnNaOspmsEMWchesB8fp2bdxq5yOf8WKPNZf8R0A',
      data => {
        setReceivedMessages(prevMessages => [...prevMessages, data.message]);
      },
    );

    Alert.alert('asdasd');

    return () => {
      socketService.close();
    };

    return () => {
      clearTimer();
    };
  }, [remainingTime]);

  const TimeOutinit = () => {
    if (remainingTime < 120) {
      console.log('remainingTime: ', remainingTime);
      interval = setInterval(() => {
        setRemainingTime(prev => prev + 1); // Decrease time every second
      }, 1000);
    }
  };

  const clearTimer = () => {
    if (interval) {
      clearInterval(interval); // Clean up the interval on component unmount
    }
  };

  const handleConfirm = () => {
    // Confirmation handler
    setIsConfirmed(true);
    // Alert.alert('Confirmed!', 'You have successfully confirmed the action.');
  };

  const handleToggleExpand = () => {
    // Toggle expand animation
    Animated.timing(widthAnim, {
      toValue: isExpanded ? 60 : 200, // Expand or collapse
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    Animated.timing(arrowRotation, {
      toValue: isExpanded ? 0 : 1, // Rotate arrow icon
      duration: 300,
      useNativeDriver: true,
    }).start();

    setIsExpanded(!isExpanded);
  };

  // --------------------------------------------------------------

  // const hasNotch = () => {
  //   const {height, width} = Dimensions.get('window');
  //   const aspectRatio = height / width;

  //   return (
  //     Platform.OS === 'ios' &&
  //     (aspectRatio > 2.1 || (width >= 375 && height >= 812))
  //   );
  // };

  // --------------------------------------------------------------

  const HandShakeImage = () => {
    return (
      <Image
        source={require('../asset/new/Hands_free_1.png')}
        style={{left: 20, top: 20, width: 40, height: 40, position: 'relative'}}
      />
    );
  };

  // --------------------------------------------------------------

  const TopText = () => {
    return (
      <View style={pharmacyStyles.near_accss}>
        <Text style={pharmacyStyles.near_acess_text}>Ready to scan</Text>
      </View>
    );
  };

  // --------------------------------------------------------------

  const ContentView = () => {
    return (
      <View style={[pharmacyStyles.signal_view]}>
        <Image
          source={require('../asset/new/Signal.png')}
          style={pharmacyStyles.signal_image}
        />
      </View>
    );
  };

  // --------------------------------------------------------------

  const BottomBar = () => {
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
          $0,00
        </Text>
      </TouchableOpacity>
    );
  };

  // --------------------------------------------------------------

  const InfoImage = () => {
    return (
      <Image
        source={require('../asset/new/add.png')}
        style={{
          width: 50,
          height: 50,
          position: 'absolute',
          bottom: 120, // Placed just above the BottomBar
          right: 20,
        }}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Constant.backgroundColor,
      }}>
      <Topbar
        isTitle={true}
        topBarStyle={{marginTop: hasNotch() ? 45 : 0}}
        openDrawer={() => {
          console.log('asdas');
        }}
      />
      <HandShakeImage />
      <TopText />
      <ContentView />
      <CountdownTimer
        duration={120}
        onComplete={() => {
          Alert.alert('Timer completed!');
        }}
      />
      <InfoImage />
      <BottomBar />
    </View>
  );
};

export default PharmacyScreen;

const pharmacyStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#DEF0FE',
    height: 1300,
  },
  contentView: {
    flex: 9,
    marginHorizontal: 0,
  },
  backButton: {
    top: 10,
    left: 10,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 25,
    marginHorizontal: 10,
    width: 100,
    height: 45,
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  backButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 28,
    alignContent: 'center',
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 20,
    marginHorizontal: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark overlay
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensure overlay is on top
  },
  overlayText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
  radiusView: {
    flex: 2,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    justifyContent: 'flex-end',
  },
  timerText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#004777',
  },
  signal_view: {
    alignSelf: 'center',
    flexDirection: 'column',
    width: '60%',
    alignItems: 'center',
  },
  signal_view_touch: {
    alignSelf: 'center',
    flexDirection: 'column',
    width: '70%',
    alignItems: 'center',
  },
  signal_image: {
    width: '60%',
    resizeMode: 'contain',
    height: 130,
  },
  uploading_img: {
    width: '25%',
    resizeMode: 'contain',
    height: 50,
  },
  near_accss: {
    alignSelf: 'center',
    flexDirection: 'column',
    marginTop: 10,
    height: 60,
    width: '70%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  near_acess_text: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
});
