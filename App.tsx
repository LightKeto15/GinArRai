import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import SignIn from './screens/SignIn';
const NavStack = createNativeStackNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <NavStack.Navigator
        initialRouteName="SignIn"
        screenOptions={{headerShown: false}}>
        <NavStack.Screen name="SignIn" component={SignIn} />
      </NavStack.Navigator>
    </NavigationContainer>
  );
}
