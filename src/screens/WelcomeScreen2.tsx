import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import WelcomeScreenTemplate from '../components/WelcomeScreenTemplate';
import Welcome2Background from '../components/Welcome2Background';

type WelcomeScreen2NavigationProp = StackNavigationProp<RootStackParamList, 'WelcomeScreen2'>;

interface WelcomeScreen2Props {
  navigation: WelcomeScreen2NavigationProp;
}

const WelcomeScreen2: React.FC<WelcomeScreen2Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Welcome2Background />
      <WelcomeScreenTemplate
        title="记录还是干预"
        subtitle={[
          "行为数据将持续生成",
          "你可旁观其消耗，亦可干预其构建",
          "选择权在你，非系统"
        ]}
        nextScreen="WelcomeScreen3"
        navigation={navigation}
        showStatusBar={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000201', // MasterGo设计中的背景色
  },
});

export default WelcomeScreen2;

// 注释: 如需使用视频背景，取消下面的注释，注释上面的代码
/*
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import WelcomeScreenTemplate from '../components/WelcomeScreenTemplate';

type WelcomeScreen2NavigationProp = StackNavigationProp<RootStackParamList, 'WelcomeScreen2'>;

interface WelcomeScreen2Props {
  navigation: WelcomeScreen2NavigationProp;
}

// 本地视频路径
const videoSource = require('../../assets/videos/welcome2_video.mp4');

const WelcomeScreen2: React.FC<WelcomeScreen2Props> = ({ navigation }) => {
  return (
    <WelcomeScreenTemplate
      videoSource={videoSource}
      title="记录还是干预"
      subtitle={[
        "行为数据将持续生成",
        "你可旁观其消耗，亦可干预其构建",
        "选择权在你，非系统"
      ]}
      nextScreen="WelcomeScreen3"
      navigation={navigation}
      showStatusBar={false}
    />
  );
};

export default WelcomeScreen2;
*/ 