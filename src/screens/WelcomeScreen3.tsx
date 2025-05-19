import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import WelcomeScreenTemplate from '../components/WelcomeScreenTemplate';
import Welcome3Background from '../components/Welcome3Background';

type WelcomeScreen3NavigationProp = StackNavigationProp<RootStackParamList, 'WelcomeScreen3'>;

interface WelcomeScreen3Props {
  navigation: WelcomeScreen3NavigationProp;
}

const WelcomeScreen3: React.FC<WelcomeScreen3Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Welcome3Background />
      <WelcomeScreenTemplate
        title="偶发跃迁"
        subtitle={[
          "渺小，混乱，不稳定",
          "然而偶发跃迁，足以改变一整个系统"
        ]}
        nextScreen="SetupScreen"
        navigation={navigation}
        showStatusBar={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});

export default WelcomeScreen3;

// 注释: 如需使用视频背景，取消下面的注释，注释上面的代码
/*
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import WelcomeScreenTemplate from '../components/WelcomeScreenTemplate';

type WelcomeScreen3NavigationProp = StackNavigationProp<RootStackParamList, 'WelcomeScreen3'>;

interface WelcomeScreen3Props {
  navigation: WelcomeScreen3NavigationProp;
}

// 本地视频路径
const videoSource = require('../../assets/videos/welcome3_video.mp4');

const WelcomeScreen3: React.FC<WelcomeScreen3Props> = ({ navigation }) => {
  return (
    <WelcomeScreenTemplate
      videoSource={videoSource}
      title="偶发跃迁"
      subtitle={[
        "渺小，混乱，不稳定",
        "然而偶发跃迁，",
        "足以改变一整个系统"
      ]}
      nextScreen="SetupScreen"
      navigation={navigation}
      showStatusBar={false}
    />
  );
};

export default WelcomeScreen3;
*/ 