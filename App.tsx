import 'react-native-gesture-handler';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import AppStack from './src/navigation/AppStack';
import AuthStack from './src/navigation/AuthStack';
import {LoadModel} from './src/components/LoadModal';
import {NativeBaseProvider} from 'native-base';
import {theme} from './src/styles/Theme';
import {Provider, useDispatch, useSelector} from 'react-redux';
import configureStore, {runSaga} from './redux';
import {fetchByID, removeAllFavorite} from './redux/fav-meal/actions';
import {addUser} from './redux/user/actions';
import {getUser} from './redux/user/selectors';
import {isLoading} from './redux/fav-meal/selectors';

function MainApp() {
  const user = useSelector(getUser);
  const modal = useSelector(isLoading);
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(userState: FirebaseAuthTypes.User | null) {
    if (!userState) {
      dispatch(removeAllFavorite());
    } else {
      dispatch(fetchByID(userState!.uid));
    }

    dispatch(addUser(userState));
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
        {user ? <AppStack /> : <AuthStack />}
        <LoadModel visible={modal} />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const store = configureStore();
export default function () {
  runSaga();
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}
