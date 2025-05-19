import React from 'react';
import { StyleSheet, View, Dimensions, ImageBackground } from 'react-native';

const { width, height } = Dimensions.get('window');

const MainBackground: React.FC = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/main_bg.png')}
        style={styles.background}
        resizeMode="cover"
      >
        {/* 作为兜底的深色背景 */}
        <View style={styles.overlay} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: '#121212', // 深色背景
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(18,18,18,0.2)', // 可选：加深图片色调
  },
});

export default MainBackground; 