import 'react-native-gesture-handler';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import React, {useState, useEffect, useContext} from 'react';
import {ActivityIndicator, View} from 'react-native';
import AppStack from './src/navigation/AppStack';
import AuthStack from './src/navigation/AuthStack';
import {AppContext, AppProvider} from './src/provider/AppProvider';
import MealAPI from './src/fetch/MealAPI';
import {MealModel} from './src/model/MealModel';
import firestore from '@react-native-firebase/firestore';
import {LoadModel} from './src/components/LoadModal';
import {NativeBaseProvider} from 'native-base';
import { theme } from './src/styles/Theme';

function MainApp() {
  const appContext = useContext(AppContext);
  const [initializing, setInitializing] = useState(true);
  const [model, setModel] = useState(false);

  function onAuthStateChanged(userState: FirebaseAuthTypes.User | null) {
    if (!userState) {
      appContext?.removelAllFav();
    } else {
      if (appContext) {
        async function fetchAPI() {
          try {
            setModel(true);
            console.log('being fetch...');
            await firestore()
              .collection('Users')
              .doc('log')
              .update({user: true});
            const udata = await firestore()
              .collection('Users')
              .doc(userState!.uid)
              .get();
            let favList = udata.data()!['favList'] as Array<string>;
            let nList = new Map<string, MealModel>();
            await Promise.all(
              favList.map(async id => {
                const fData = await MealAPI.getById(id);
                nList.set((fData as MealModel).idMeal!, fData as MealModel);
              }),
            );
            appContext?.addUserFavBatch(nList);
            console.log('done fetch...');
            setModel(false);
          } catch (error) {
            console.log(error);
          }
        }
        fetchAPI();
      }
    }
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
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        {appContext!.user ? <AppStack /> : <AuthStack />}
        <LoadModel visible={model} />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default function () {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
