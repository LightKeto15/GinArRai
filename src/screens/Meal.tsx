import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Button,
  ImageBackground,
  Linking,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import MealAPI from '../fetch/MealAPI';
import {MealModel} from '../model/MealModel';
import {AppContext} from '../provider/AppProvider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  AppDrawerParamList,
  AppRootStackParamList,
} from '../navigation/AppStack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {TouchableHighlight} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
type MealNavProp = NavigationProp<AppRootStackParamList, 'Meal'>;
type MealDrawerProp = DrawerNavigationProp<AppDrawerParamList, 'HomeDrawer'>;
function Meal() {
  const navigator = useNavigation<MealNavProp>();
  const draweragator = navigator.getParent<MealDrawerProp>();
  const [data, setData] = useState<MealModel | null>(null);
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
        appContext?.addUserFav(data!);
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
      //console.log(fav);
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
  const onAgain = () => {
    if (fav) {
      appContext?.addUserFav(data);
    } else {
      setData(null);
      setFetchData(!fetchData);
    }
  };

  const onFavorite = () => {
    if (fav) {
      //appContext?.removeUserFav(data.idMeal!);
      setFav(false);
    } else {
      //appContext?.addUserFav(data);
      setFav(true);
    }
  };

  const getTagView = () => {
    return;
    <Text>{data!.strTags}</Text>;
  };
  /*const getIngredient = () => {
    return (
      <View>
        <Text>
          {data!.strIngredient1
            ? `${data!.strIngredient1} : ${data!.strMeasure1}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient2
            ? `${data!.strIngredient2} : ${data!.strMeasure2}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient3
            ? `${data!.strIngredient3} : ${data!.strMeasure3}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient4
            ? `${data!.strIngredient4} : ${data!.strMeasure4}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient5
            ? `${data!.strIngredient5} : ${data!.strMeasure5}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient6
            ? `${data!.strIngredient6} : ${data!.strMeasure6}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient7
            ? `${data!.strIngredient7} : ${data!.strMeasure7}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient8
            ? `${data!.strIngredient8} : ${data!.strMeasure8}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient9
            ? `${data!.strIngredient9} : ${data!.strMeasure9}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient10
            ? `${data!.strIngredient10} : ${data!.strMeasure10}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient11
            ? `${data!.strIngredient11} : ${data!.strMeasure11}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient12
            ? `${data!.strIngredient12} : ${data!.strMeasure12}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient13
            ? `${data!.strIngredient13} : ${data!.strMeasure13}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient14
            ? `${data!.strIngredient14} : ${data!.strMeasure14}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient15
            ? `${data!.strIngredient15} : ${data!.strMeasure15}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient16
            ? `${data!.strIngredient16} : ${data!.strMeasure16}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient17
            ? `${data!.strIngredient17} : ${data!.strMeasure17}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient18
            ? `${data!.strIngredient18} : ${data!.strMeasure18}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient19
            ? `${data!.strIngredient19} : ${data!.strMeasure19}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient20
            ? `${data!.strIngredient20} : ${data!.strMeasure20}`
            : null}
        </Text>
      </View>
    );
  };*/
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
                appContext?.addUserFav(data);
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
            {data!.strMeal}
          </Text>
          <Text
            style={{
              flexWrap: 'wrap',
              flexShrink: 1,
              fontSize: 22,
              color: '#e76f51',
            }}>
            {data!.strCategory}
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
            source={{uri: data!.strMealThumb!}}></FastImage>
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
            onPress={() => navigator.navigate('Instruction', {mealData: data})}
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
