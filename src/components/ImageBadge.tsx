import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ViewStyle,
  ImageStyle,
} from 'react-native';

interface ImageWithBadgeProps {
  imageSource: any;
  badgeCount: number;
  imageStyle?: ImageStyle;
  badgeStyle?: ViewStyle;
}

const ImageWithBadge: React.FC<ImageWithBadgeProps> = ({
  imageSource,
  badgeCount,
  imageStyle,
  badgeStyle,
}) => {
  return (
    <View style={styles.container}>
      {/* Image View */}
      <Image source={imageSource} style={[styles.image, imageStyle]} />

      {/* Badge View */}
      <View style={[styles.badgeContainer, badgeStyle]}>
        <Text style={styles.badgeText}>{badgeCount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative', // To position badge inside this container
    width: 80, // Adjust width and height of image (default)
    height: 'auto',
    // backgroundColor: 'red',
  },
  image: {
    // width: 30,
    // height: 50,
    height: 100,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  badgeContainer: {
    position: 'absolute', // To overlay the badge on the image
    top: -5, // Adjust the badge position
    right: -5,
    backgroundColor: 'red',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ImageWithBadge;
