import React from 'react';
import { ColorValue, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path, Text } from 'react-native-svg';
import { theme } from '../theme';

interface Props {
  title: string;
  onPress: () => void;
  type: 'solid' | 'outlined';
  color: ColorValue;
}


const SOLID_PATH = 'M0 18C0 8.724 7.32713 1.1117 16.5989 0.831236C29.4183 0.443453 47.1886 -0.0049771 60.6828 4.17497e-05C74.0378 0.00500883 91.6557 0.450076 104.4 0.834229C113.671 1.11369 121 8.72478 121 18C121 27.2752 113.671 34.8863 104.4 35.1657C91.6557 35.5499 74.0378 35.995 60.6828 36C47.1886 36.005 29.4182 35.5565 16.5988 35.1687C7.32711 34.8882 0 27.276 0 18Z';
const OUTLINED_PATH = 'M0.5 18C0.5 8.99199 7.61463 1.60324 16.614 1.33101C29.4328 0.943241 47.1967 0.495026 60.6826 0.500042C74.0296 0.505006 91.6412 0.949866 104.385 1.334C113.383 1.60526 120.5 8.99289 120.5 18C120.5 27.0071 113.383 34.3947 104.385 34.666C91.6412 35.0501 74.0296 35.495 60.6826 35.5C47.1966 35.505 29.4328 35.0567 16.614 34.669C7.61462 34.3967 0.5 27.008 0.5 18Z';

export const DialogButton = ({ onPress, title, type, color }: Props) => {

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Svg width={121} height={36} viewBox={'0 0 121 36'}>
        <Path
          d={type === 'outlined' ? OUTLINED_PATH : SOLID_PATH}
          fill={type === 'solid' ? color : theme.colors.background}
          stroke={type === 'outlined' ? color : 'transparent'}
          strokeWidth={type === 'outlined' ? 1 : 0}
        />
        <Text
          x={'50%'}
          y={'50%'}
          alignmentBaseline="central"
          textAnchor="middle"
          fill={type === 'solid' ? theme.colors.background : color}
          fontSize={16}
        >
          {title}
        </Text>
      </Svg>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DialogButton;
