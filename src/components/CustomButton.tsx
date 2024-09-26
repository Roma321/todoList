import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { PRIMARY_COLOR } from '../../constants';
interface Props {
  title: string;
  onPress: () => void;
}
export const CustomButton = ({ onPress, title }: Props) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Svg
        height="60"
        width="200"
        viewBox="0 0 200 60"
        style={styles.svgStyle}
      >
        <Path
          d="M0 18C0 8.724 7.32713 1.1117 16.5989 0.831236C29.4183 0.443453 47.1886 -0.0049771 60.6828 4.17497e-05C74.0378 0.00500883 91.6557 0.450076 104.4 0.834229C113.671 1.11369 121 8.72478 121 18C121 27.2752 113.671 34.8863 104.4 35.1657C91.6557 35.5499 74.0378 35.995 60.6828 36C47.1886 36.005 29.4182 35.5565 16.5988 35.1687C7.32711 34.8882 0 27.276 0 18Z"
          fill={PRIMARY_COLOR}
        />
      </Svg>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  svgStyle: {
    position: 'absolute',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CustomButton;
