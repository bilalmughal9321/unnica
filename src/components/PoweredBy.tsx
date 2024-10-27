import React from 'react';
import {View, Text, ViewStyle} from 'react-native';

interface powerProps {
  powerStyles?: ViewStyle;
}

const PoweredBy: React.FC<powerProps> = ({powerStyles}) => (
  <View style={[{position: 'absolute', bottom: 50, right: 10}, powerStyles]}>
    <Text style={{fontSize: 16, color: '#555'}}>Powered by UNNICA ®</Text>
  </View>
);

export default PoweredBy;
