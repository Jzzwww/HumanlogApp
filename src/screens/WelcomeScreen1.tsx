import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import WelcomeScreenTemplate from '../components/WelcomeScreenTemplate';
import Welcome1Background from '../components/Welcome1Background';

type WelcomeScreen1NavigationProp = StackNavigationProp<RootStackParamList, 'WelcomeScreen1'>;

interface WelcomeScreen1Props {
  navigation: WelcomeScreen1NavigationProp;
}

const WelcomeScreen1: React.FC<WelcomeScreen1Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Welcome1Background />
      <WelcomeScreenTemplate
        title="人类样本记录"
        subtitle={[
          "样本编号：001",
          "正在初始化该人类个体的全周期行为记录"
        ]}
        nextScreen="WelcomeScreen2"
        navigation={navigation}
        showStatusBar={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020911', // MasterGo设计中的背景色
  },
});

export default WelcomeScreen1; 