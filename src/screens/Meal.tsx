import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import MealAPI from '../fetch/MealAPI';
import {MealModel} from '../model/MealModel';
import {AppContext} from '../provider/AppProvider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  AppDrawerParamList,
  AppRootStackParamList,
} from '../navigation/AppStack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import FastImage from 'react-native-fast-image';
type MealNavProp = NavigationProp<AppRootStackParamList, 'Meal'>;
type MealDrawerProp = DrawerNavigationProp<AppDrawerParamList, 'HomeDrawer'>;
function Meal() {
  const navigator = useNavigation<MealNavProp>();
  const draweragator = navigator.getParent<MealDrawerProp>();
  const [data, setData] = useState<MealModel | null | string>(null);
  const appContext = useContext(AppContext);
  const [fav, setFav] = useState(false);
  useLayoutEffect(() => {
    draweragator.setOptions({
      title: '',
      headerTransparent: true,
      headerShown: false,
    });
    return () => {
      draweragator.setOptions({
        title: '',
        headerTransparent: true,
        headerShown: true,
      });
    };
  }, []);
  const backAction = useCallback(() => {
    if (fav === true) {
      console.log(fav);
      try {
        appContext?.addUserFav(data! as MealModel);
      } catch (e) {
        //Nothing..
      }
    } else {
      console.log('fav');
    }
    return false;
  }, [fav]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
    };
  }, [fav]);

  const [fetchData, setFetchData] = useState(false);
  const {width} = useWindowDimensions();

  if (!data) {
    MealAPI.getRandom().then(data => {
      setData(data);
      setFav(false);
    });
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={80} style={{marginBottom: 30}} />
        <Text
          style={{
            flexWrap: 'wrap',
            flexShrink: 1,
            fontSize: 30,
            color: '#e76f51',
          }}>
          Searching new meal!
        </Text>
      </View>
    );
  }
  else if (data as string) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            flexWrap: 'wrap',
            flexShrink: 1,
            fontSize: 30,
            color: '#e76f51',
          }}>{data}</Text>
        <Text
          style={{
            flexWrap: 'wrap',
            flexShrink: 1,
            fontSize: 25,
            color: '#e76f51',
          }}>
          Please try again later.
        </Text>
      </View>
    );
  }
  const onAgain = () => {
    if (fav) {
      appContext?.addUserFav(data as MealModel);
    } else {
      setData(null);
      setFetchData(!fetchData);
    }
  };

  const onFavorite = () => {
    if (fav) {
      setFav(false);
    } else {
      setFav(true);
    }
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1, flexDirection: 'column'}}>
      <View
        style={{
          flex: 1,
          flexGrow: 1,
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            width: width,
            flexGrow: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginLeft: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigator.goBack();
              if (fav) {
                appContext?.addUserFav(data as MealModel);
              }
            }}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialIcons
              name="navigate-before"
              size={42}
              color={'#1c1c1ead'}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexGrow: 2,
            width: width,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            padding: 10,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,
            elevation: 1,
          }}>
          <Text
            style={{
              flexWrap: 'wrap',
              flexShrink: 1,
              fontSize: 30,
              color: '#e76f51',
            }}>
            {(data as MealModel)!.strMeal}
          </Text>
          <Text
            style={{
              flexWrap: 'wrap',
              flexShrink: 1,
              fontSize: 22,
              color: '#e76f51',
            }}>
            {(data as MealModel)!.strCategory}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexGrow: 8,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
          }}>
          <FastImage
            resizeMode="center"
            style={{
              width: width * 0.9,
              height: width * 0.9,

              borderRadius: 8,
            }}
            source={{uri: (data as MealModel)!.strMealThumb!}}></FastImage>
        </View>
        <View
          style={{
            flex: 1,
            flexGrow: 2,
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() =>
              navigator.navigate('Instruction', {mealData: data as MealModel})
            }
            style={{
              borderWidth: 5,
              borderColor: '#e76f51',
              borderRadius: 55,
              width: 55,
              height: 55,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2,
            }}>
            <MaterialIcons name="restaurant-menu" size={42} color={'#e76f51'} />
          </TouchableOpacity>
          <View style={{width: width * 0.1}} />
          <TouchableOpacity
            onPress={onFavorite}
            style={{
              borderWidth: 5,
              borderColor: '#e76f51',
              borderRadius: 55,
              width: 55,
              height: 55,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2,
            }}>
            <MaterialIcons
              name="favorite"
              size={42}
              color={fav ? '#9d0208' : '#1c1c1ead'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          height: 80,
          backgroundColor: 'white',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
        }}>
        <View style={{width: '100%', height: 0.5, backgroundColor: 'gray'}} />
        <TouchableOpacity
          onPress={onAgain}
          style={{
            backgroundColor: '#e76f51',
            borderRadius: 8,
            height: 48,
            width: '45%',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}>
            <View
              style={{
                flex: 1,
                flexGrow: 5,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <MaterialIcons name="refresh" size={28} color="white" />
            </View>
            <View
              style={{
                flex: 1,
                flexGrow: 7,
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 22, marginLeft: 10}}>
                New
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Meal;
