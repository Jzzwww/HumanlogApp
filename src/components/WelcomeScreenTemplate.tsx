import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, StatusBar, ImageSourcePropType, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Video, ResizeMode, AVPlaybackSource } from 'expo-av';

interface WelcomeScreenTemplateProps {
  videoSource?: AVPlaybackSource;
  backgroundImage?: ImageSourcePropType;
  title: string;
  subtitle: string[];
  nextScreen: keyof RootStackParamList;
  navigation: StackNavigationProp<RootStackParamList, keyof RootStackParamList>;
  showStatusBar?: boolean;
}

const { width, height } = Dimensions.get('window');

export const WelcomeScreenTemplate: React.FC<WelcomeScreenTemplateProps> = ({
  videoSource,
  backgroundImage,
  title,
  subtitle,
  nextScreen,
  navigation,
  showStatusBar = false,
}) => {
  const handlePress = () => {
    navigation.navigate(nextScreen);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={!showStatusBar} />
      
      {/* 顶部背景图片 */}
      {backgroundImage && (
        <View style={styles.imageWrapper}>
          <Image 
            source={backgroundImage} 
            style={styles.backgroundImage}
            resizeMode="contain"
          />
        </View>
      )}
      
      {/* 内容区域 */}
      <TouchableOpacity 
        style={styles.contentContainer} 
        activeOpacity={1} 
        onPress={handlePress}
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle.map((line, index) => (
            <Text key={index} style={styles.subtitle}>{line}</Text>
          ))}
        </View>
        <Text style={styles.tapText}>点击任意位置继续</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  imageWrapper: {
    width: width,
    height: 320,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    overflow: 'visible',
  },
  backgroundImage: {
    width: 393,
    height: 320,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textContainer: {
    alignItems: 'center',
    maxWidth: '90%',
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontFamily: 'Source Han Serif CN',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '400',
    lineHeight: 34,
  },
  subtitle: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'Source Han Serif CN',
    textAlign: 'center',
    lineHeight: 32,
  },
  tapText: {
    color: '#9E9E9E',
    fontSize: 10,
    fontFamily: 'System',
    position: 'absolute',
    bottom: 50,
  },
});

export default WelcomeScreenTemplate; 