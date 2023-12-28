import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, Rect, LinearGradient, Stop } from 'react-native-svg';

const FROM_COLOR = 'rgb(45, 132, 235)';
const TO_COLOR = 'rgb(130, 89, 239)';

const GradientHedera = ({ children }) => {
  return (
    <View style={ { flex: 1 } }>
      <Svg height="100%" width="100%" style={ StyleSheet.absoluteFillObject }>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0" stopColor={ FROM_COLOR }/>
            <Stop offset="1" stopColor={ TO_COLOR }/>
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grad)" />
      </Svg>
      { children }
    </View>
  );
};

export default GradientHedera;