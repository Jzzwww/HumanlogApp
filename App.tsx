import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { UserProvider } from './src/utils/UserContext';
import { StatusBar } from 'expo-status-bar';
import { LogBox, Platform, UIManager } from 'react-native';

// 跳过烦人的警告
LogBox.ignoreLogs(['Require cycle:', 'ViewPropTypes']);

// 启用安卓的布局动画
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <UserProvider>
        <AppNavigator />
      </UserProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
