import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import React, {useState, useEffect, useContext} from 'react';
import {ActivityIndicator, View} from 'react-native';
import AppStack from './navigation/AppStack';
import AuthStack from './navigation/AuthStack';
import {AppContext, AppProvider} from './provider/AppProvider';

function MainApp() {
  const appContext = useContext(AppContext);
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(userState: FirebaseAuthTypes.User | null) {
    appContext!.setUser(userState);
    if (initializing) setInitializing(false);
  }
  
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {appContext!.user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function () {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
