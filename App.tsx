import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/pages/Home';
import Player from './src/pages/Player';
import { MainStackParamList } from './types';

const MainStack = createStackNavigator<MainStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <MainStack.Navigator screenOptions={{ headerShown: false, cardStyle:{ backgroundColor: 'white' } }}>
          <MainStack.Screen name='Home' component={Home} />
          <MainStack.Screen name='Player' component={Player} />
        </MainStack.Navigator>
      </SafeAreaView>
      <StatusBar style='dark'/>
    </NavigationContainer>
  );
}
