import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';

interface CreditCardProps {
  cardDetails: {
    background: string;
    number?: string;
    name?: string;
    expiry?: string;
    cvc?: string;
    type?: string;
  };
  onCardPress: () => void;
}

const CrediCard: React.FC<CreditCardProps> = ({cardDetails, onCardPress}) => {
  // # ======================== Variable ======================= #

  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  // # ======================== Flip ======================= #
  const flipCard = () => {
    if (isFlipped) {
      Animated.spring(flipAnimation, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(flipAnimation, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
    setIsFlipped(!isFlipped);
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{rotateY: frontInterpolate}],
  };

  const backAnimatedStyle = {
    transform: [{rotateY: backInterpolate}],
  };

  const setBackground = (imageLink: string) => {
    switch (imageLink) {
      case 'purple':
        return require('../asset/www.jpg');
      case 'blue':
        return require('../asset/blue.jpg');
      case 'golden':
        return require('../asset/gold.jpg');
      default:
        return require('../asset/blue.jpg'); // fallback image
    }
  };

  const backgroundImage = setBackground(cardDetails.background);

  return (
    <TouchableWithoutFeedback onPress={onCardPress} onLongPress={flipCard}>
      <View style={styles.cardContainer}>
        {/* Front Side of the Card */}
        <Animated.View style={[styles.card, frontAnimatedStyle]}>
          <ImageBackground
            source={backgroundImage} // Dynamic image link
            style={styles.imageBackground}
            imageStyle={{borderRadius: 10}} // optional, for rounded corners
          >
            <View style={styles.chip} />
            <Image
              style={styles.cardLogo}
              source={require('../asset/visa.png')}
            />
            <Text style={styles.cardNumber}>{cardDetails.number}</Text>
            <View style={styles.cardDetails}>
              <Text style={styles.cardName}>{cardDetails.name}</Text>
              <View>
                <Text style={styles.validThruLabel}>VALID THR</Text>
                <Text style={styles.expiryDate}>12/24</Text>
              </View>
            </View>
          </ImageBackground>
        </Animated.View>

        {/* Back Side of the Card */}
        <Animated.View
          style={[styles.card, styles.cardBack, backAnimatedStyle]}>
          <ImageBackground
            source={backgroundImage} // Dynamic image link
            style={styles.imageBackground}
            imageStyle={{borderRadius: 10}}>
            <View style={styles.blackStrip} />
            <Text style={styles.cvc}>123</Text>
          </ImageBackground>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 30,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center', // center vertically
    alignSelf: 'center', // center horizontally
  },
  card: {
    position: 'absolute',
    width: 320,
    height: 180,
    borderRadius: 10,
    backgroundColor: 'transparent', // no background since image will be used
    justifyContent: 'space-between',
    backfaceVisibility: 'hidden', // important for flipping
    shadowColor: '#000', // Shadow color (black)
    shadowOffset: {width: 0, height: 15}, // Offset shadow downwards (x=0, y=15)
    shadowOpacity: 0.4, // Shadow opacity
    shadowRadius: 10, // Shadow blur radius
    elevation: 5, // Elevation for Android shadow
  },
  cardBack: {
    backgroundColor: 'transparent',
  },
  imageBackground: {
    flex: 1,
    padding: 20,
  },
  chip: {
    width: 40,
    height: 30,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  cardLogo: {
    width: 60,
    height: 40,
    position: 'absolute',
    right: 20,
    top: 20,
    resizeMode: 'contain',
  },
  cardNumber: {
    fontSize: 20,
    color: '#fff',
    letterSpacing: 2,
    marginVertical: 20,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  validThruLabel: {
    color: '#ccc',
    fontSize: 10,
    fontWeight: 'bold',
  },
  expiryDate: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  blackStrip: {
    height: 40,
    backgroundColor: '#000',
    marginTop: 20,
  },
  cvc: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    color: '#000',
    fontSize: 18,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 3,
  },
});

export default CrediCard;
