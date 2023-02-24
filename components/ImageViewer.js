import {Image, StyleSheet } from 'react-native';
import React from 'react';

export default function ImageViewer({placeholderImageSource, selectedImageSource}) {
  return (
    <Image source={selectedImageSource ? {uri:selectedImageSource}: placeholderImageSource} style={styles.image} />
  );
};

const styles = StyleSheet.create({
    image: {
      width: 330,
      height: 440,
      borderRadius: 18
    }
});
