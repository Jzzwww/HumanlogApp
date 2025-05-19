import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// 使用最新的欢迎页2背景图
const backgroundImage = require('../../assets/images/welcome2_bg_updated.png');

const Welcome2Background: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={backgroundImage}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 320,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'visible',
  },
  image: {
    width: 393,
    height: 320,
  }
});

export default Welcome2Background; 