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
import {theme} from './src/styles/Theme';
import {Provider, useDispatch, useSelector} from 'react-redux';
import configureStore, { runSaga } from './redux';
import {
  addBatchFavorite,
  fetchByID,
  removeAllFavorite,
} from './redux/fav-meal/action';
import {addUser} from './redux/user/actions';
import {getUser} from './redux/user/selector';
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
      console.log('being fetch...');
      dispatch(fetchByID(userState!.uid));
      //async function fetchAPI() {
      //  try {
      //setModel(true);

      /*await firestore().collection('Users').doc('log').update({user: true});
          const udata = await firestore()
            .collection('Users')
            .doc(userState!.uid)
            .get();
          let favList = udata.data()!['favList'] as Array<string>;
          if (favList.length > 0) {
            let nList = Array<MealModel>(); //new Map<string, MealModel>();
            await Promise.all(
              favList.map(async id => {
                const fData = await MealAPI.getById(id);
                nList.push(fData as MealModel);
                //nList.set((fData as MealModel).idMeal!, fData as MealModel);
              }),
            );
            //appContext?.addUserFavBatch(nList);
            console.log('1:fetch...');
            dispatch(addBatchFavorite(nList));*/
      console.log('done fetch...');
      //}
      //setModel(false);
      //  } catch (error) {
      //     console.log(error);
      //  }
      // }
      // fetchAPI();
    }
    //appContext!.setUser(userState);
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
  runSaga()
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}
