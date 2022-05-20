import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Auth from '../screens/Auth';

export type AuthRootStackParamList = {
  SignIn: undefined;
};
const AuthNavStack = createNativeStackNavigator<AuthRootStackParamList>();

export default function AuthStack() {
  return (
    <AuthNavStack.Navigator
      initialRouteName="SignIn"
      screenOptions={{headerShown: false}}>
      <AuthNavStack.Screen name="SignIn" component={Auth} />
    </AuthNavStack.Navigator>
  );
}
