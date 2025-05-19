import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CustomSplash: React.FC = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#000000', '#111111']}
        style={styles.background}
      >
        <View style={styles.iconContainer}>
          <View style={styles.headShape}>
            <View style={styles.asterisk}>
              <View style={styles.vertical} />
              <View style={[styles.diagonal, styles.diagonal1]} />
              <View style={[styles.diagonal, styles.diagonal2]} />
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headShape: {
    width: 200,
    height: 240,
    backgroundColor: '#EFEFEF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  asterisk: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  vertical: {
    width: 20,
    height: 120,
    backgroundColor: '#111',
    position: 'absolute',
  },
  diagonal: {
    width: 20,
    height: 120,
    backgroundColor: '#111',
    position: 'absolute',
  },
  diagonal1: {
    transform: [{ rotate: '45deg' }],
  },
  diagonal2: {
    transform: [{ rotate: '-45deg' }],
  },
});

export default CustomSplash; 