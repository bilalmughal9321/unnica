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
} from 'react-native';
// import IconBadge from 'react-native-icon-badge';
// import FooterBack from '../components/FooterBack';
import {StackScreenProps} from '@react-navigation/stack';
import {styles} from '../../style';
import CreditCard from '../components/Card';
import SlideToConfirm from '../components/Slide';
import ImageWithBadge from '../components/ImageBadge';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import CountdownTimer from '../components/CountTimer';
import {formatCardNumber} from '../Utils';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';

type PharmacyScreenProps = StackScreenProps<any, 'Pharmacy'>;

const PharmacyScreen: React.FC<PharmacyScreenProps> = ({navigation}) => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(true); // For expanding/collapsing timer
  const [remainingTime, setRemainingTime] = useState<number>(120); // Timer's remaining time state

  const widthAnim = useRef(new Animated.Value(200)).current; // Initial width for small rectangle
  const heightAnim = useRef(new Animated.Value(200)).current; // Initial height
  const arrowRotation = useRef(new Animated.Value(0)).current; // To rotate arrow icon

  const details = useSelector(
    (state: RootState) => state.cardReducer.cardDetails,
  ); // State ko access karein
  const dispatch = useDispatch();

  useEffect(() => {
    // Timer will run in the background
    let interval: NodeJS.Timeout | null = null;
    if (remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime(prev => prev - 1); // Decrease time every second
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval); // Clean up the interval on component unmount
      }
    };
  }, [remainingTime]);

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

  return (
    <ScrollView style={{flex: 1, flexDirection: 'column'}}>
      <SafeAreaView style={pharmacyStyles.safeArea}>
        <View style={pharmacyStyles.contentView}>
          {/* Header */}
          {/* <View
          style={{flexDirection: 'row', height: 50, marginHorizontal: 10}}>
          <TouchableOpacity
              style={pharmacyStyles.backButton}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../asset/left2.png')}
                style={pharmacyStyles.backIcon}
              />
              <Text style={pharmacyStyles.backButtonText}>Back</Text>
            </TouchableOpacity>

          <View style={{flex: 1}} />

            <ImageWithBadge
              imageSource={require('../asset/cart3.png')}
              badgeCount={5}
              imageStyle={{width: 90, flex: 1}}
            />
          </View> */}

          <TextInput placeholder="Search..." style={pharmacyStyles.searchBar} />
          <TouchableOpacity onLongPress={() => console.log('working')}>
            <CreditCard
              onCardPress={() => {
                navigation.navigate('CardList');
              }}
              cardDetails={{
                background:
                  details.background == '' ? 'blue' : details.background,
                name: details.name == '' ? 'Bilal' : details.name,
                number:
                  details.number == ''
                    ? formatCardNumber('5225887642450652')
                    : formatCardNumber(details.number),
                expiry: details.expiry == '' ? '14/25' : details.expiry,
                cvc: details.cvc == '' ? '123' : details.cvc,
              }}
            />
          </TouchableOpacity>

          {/* Overlay when SlideToConfirm hasn't been completed */}
          {!isConfirmed && (
            <View style={pharmacyStyles.overlay}>
              <SlideToConfirm isTitle onConfirm={handleConfirm} />
            </View>
          )}

          {/* Rest of the screen visible after confirmation */}
          {isConfirmed && (
            <View style={pharmacyStyles.radiusView}>
              {/* Collapsible Timer Component */}
              <Animated.View
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 100,
                  width: widthAnim,
                  height: heightAnim,
                  backgroundColor: '#e6eef4',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: 'black',
                  shadowOffset: {width: 0, height: 0},
                  shadowOpacity: 0.2,
                  shadowRadius: 2,
                }}>
                {isExpanded ? (
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    {/* Cross Button to Hide */}
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 5,
                        right: 5,
                        padding: 0,
                        zIndex: 1,
                      }}
                      onPress={handleToggleExpand}>
                      <Image
                        style={{width: 25, height: 25, right: -5, top: 0}}
                        source={require('../asset/cancel2.png')}
                      />
                    </TouchableOpacity>

                    {/* <CountdownCircleTimer
                      isPlaying // Timer will keep playing in the background
                      duration={120}
                      initialRemainingTime={remainingTime} // Track remaining time
                      colors={['#008000', '#dca54a', '#FF0000']} // Define distinct colors
                      colorsTime={[100, 60, 0]} // Specific times for color change
                      onComplete={() => {
                        console.log('Timer completed');
                      }}>
                      {({remainingTime}) => (
                        <Text style={pharmacyStyles.timerText}>
                          {remainingTime > 100 ? (
                            <Text style={{fontSize: 20, color: '#008000'}}>
                              Door is Open
                            </Text>
                          ) : remainingTime > 60 ? (
                            <Text style={{fontSize: 20, color: '#dca54a'}}>
                              Door is open
                            </Text>
                          ) : (
                            <Text style={{fontSize: 20, color: '#FF0000'}}>
                              Door is closed
                            </Text>
                          )}
                        </Text>
                      )}
                    </CountdownCircleTimer> */}

                    <CountdownTimer
                      duration={120}
                      onComplete={() => {
                        Alert.alert('Timer completed!');
                      }}
                    />
                  </View>
                ) : (
                  <TouchableOpacity onPress={handleToggleExpand}>
                    <Animated.Text
                      style={{
                        transform: [
                          {
                            rotate: arrowRotation.interpolate({
                              inputRange: [0, 1],
                              outputRange: ['0deg', '180deg'],
                            }),
                          },
                        ],
                        fontSize: 20,
                        color: '#000',
                      }}>
                      <Image
                        style={{width: 30, height: 30}}
                        source={require('../asset/right.png')}
                      />
                    </Animated.Text>
                  </TouchableOpacity>
                )}
              </Animated.View>

              {/* This text */}

              <View style={{marginBottom: 10}}>
                <SlideToConfirm isTitle={false} onConfirm={handleConfirm} />
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
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
});
