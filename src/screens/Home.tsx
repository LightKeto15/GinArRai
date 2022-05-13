import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {
  DrawerActions,
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Button,
  DrawerLayoutAndroid,
  Pressable,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {LoadModel} from '../components/LoadModal';
import MealAPI from '../fetch/MealAPI';
import {MealModel} from '../model/MealModel';
import {
  AppDrawerParamList,
  AppRootStackParamList,
} from '../navigation/AppStack';
import {AppContext} from '../provider/AppProvider';

type HomeNavProp = NavigationProp<AppRootStackParamList, 'Home'>;
type HomeDrawerProp = DrawerNavigationProp<AppDrawerParamList, 'HomeDrawer'>;
function Home() {
  const navigator = useNavigation<HomeNavProp>();

  const {width} = useWindowDimensions();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'column',
      }}>
      <Text
        style={{
          color: '#e76f51',
          fontSize: 32,
          marginBottom: '15%',
          fontWeight: '500',
        }}>
        Discover a delicious meal!
      </Text>
      <TouchableOpacity
        style={{
          borderWidth: 5,
          borderColor: '#e76f51',
          borderRadius: width * 0.45,
          width: width * 0.45,
          height: width * 0.45,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}
        onPress={async () => {
          navigator.navigate('Meal');
          /*let y = ['52957','52833']
          for  await (const e of y) {
            console.log(await MealAPI.getById(e))
          }
          console.log("DONE1")*/
        }}>
        <View
          style={{
            borderColor: 'white',
            borderWidth: 8,
            backgroundColor: '#e76f51',
            borderRadius: width * 0.43,
            width: width * 0.43,
            height: width * 0.43,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 50, color: 'white'}}>Go</Text>
        </View>
      </TouchableOpacity>
     
    </View>
  );
}

export default Home;
