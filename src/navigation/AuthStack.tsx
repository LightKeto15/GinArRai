import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import SignIn from '../screens/native/SignIn';

export type AuthRootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};
const AuthNavStack = createNativeStackNavigator<AuthRootStackParamList>();

export default function AuthStack() {
  return (
    <AuthNavStack.Navigator
      initialRouteName="SignIn"
      screenOptions={{headerShown: false}}>
      <AuthNavStack.Screen name="SignIn" component={SignIn} />
      <AuthNavStack.Screen name="SignUp" component={SignUp} />
    </AuthNavStack.Navigator>
  );
}
