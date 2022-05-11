import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Favorite from '../screens/Favorite';
import Home from '../screens/Home';
import Meal from '../screens/Meal';

export type AppRootStackParamList = {
  Home: undefined;
  Favorite: undefined;
  Meal: undefined;
};
const AppNavStack = createNativeStackNavigator<AppRootStackParamList>();

export default function AppStack() {
  return (
    <AppNavStack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <AppNavStack.Screen name="Home" component={Home} />
      <AppNavStack.Screen name="Favorite" component={Favorite} />
      <AppNavStack.Screen name="Meal" component={Meal} />
    </AppNavStack.Navigator>
  );
}
