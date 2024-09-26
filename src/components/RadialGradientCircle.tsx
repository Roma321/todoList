import React from 'react';
import { StyleSheet, View } from 'react-native';
import RadialGradient from 'react-native-radial-gradient';

interface Props {
  color: string;
  radius: number;
  top?: number;
  left?: number;
  right?: number;
}

export const RadialGradientCircle = ({ color, radius, top, left, right }: Props) => {

  const toCircleCenterPosition = (coord: number | undefined): number | undefined => {
    return coord !== undefined ? coord - radius : undefined;
  };
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: toCircleCenterPosition(top),
      left: toCircleCenterPosition(left),
      right: toCircleCenterPosition(right),
    },
    gradient: {
      width: radius * 2,
      height: radius * 2,
    },
  });

  return (
    <View style={styles.container}>
      <RadialGradient
        style={styles.gradient}
        colors={[color, 'transparent']}
        stops={[0, 0.7]}
        radius={radius}
      />
    </View>
  );
};


