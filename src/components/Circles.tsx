import { Image, StyleSheet, Dimensions } from 'react-native';
import circlesImage from '../assets/bg_circles.png';
import React from 'react';

const { width, height } = Dimensions.get('window');

export const Circles = () => {
    return (
        <Image
            source={circlesImage}
            style={styles.backgroundImage}
        />
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
        resizeMode: 'cover',
    },
});
