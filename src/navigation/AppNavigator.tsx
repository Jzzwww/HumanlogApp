import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// 导入屏幕组件
import WelcomeScreen1 from '../screens/WelcomeScreen1';
import WelcomeScreen2 from '../screens/WelcomeScreen2';
import WelcomeScreen3 from '../screens/WelcomeScreen3';
import SetupScreen from '../screens/SetupScreen';
import MainScreen from '../screens/MainScreen';

// 定义导航参数类型
export type RootStackParamList = {
  WelcomeScreen1: undefined;
  WelcomeScreen2: undefined;
  WelcomeScreen3: undefined;
  SetupScreen: undefined;
  MainScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WelcomeScreen1"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="WelcomeScreen1" component={WelcomeScreen1} />
        <Stack.Screen name="WelcomeScreen2" component={WelcomeScreen2} />
        <Stack.Screen name="WelcomeScreen3" component={WelcomeScreen3} />
        <Stack.Screen name="SetupScreen" component={SetupScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 