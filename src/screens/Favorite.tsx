import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useContext, useRef, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {MealModel} from '../model/MealModel';
import {AppContext} from '../provider/AppProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import {AppFavRootStackParamList} from '../navigation/AppStack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {LoadModel} from '../components/LoadModal';

type FavNavProp = NavigationProp<AppFavRootStackParamList, 'Favorite'>;
function Favorite() {
  const navigator = useNavigation<FavNavProp>();
  const appContext = useContext(AppContext);
  const [model, setModel] = useState(false);
  const flatListRef = useRef<FlatList<MealModel> | null>(null);

  if (!appContext?.userFav || appContext?.userFav.size == 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <MaterialCommunityIcons
          name="emoticon-sad-outline"
          size={80}
          color={'#e76f51'}
        />
        <Text
          style={{
            fontSize: 28,
            fontWeight: '500',
            color: '#e76f51',
            marginTop: 20,
          }}>
          No favorite meal!
        </Text>
      </View>
    );
  }

  const renderCard = (item: MealModel) => {
    const fav = appContext?.isFavorite(item.strMeal!);
    return (
      <TouchableOpacity
        onPress={() => navigator.navigate('InstructionFav', {mealData: item})}>
        <View
          style={{
            flex: 1,
            height: 120,
            flexDirection: 'row',
            justifyContent: 'center',
            shadowColor: '#000',
            alignItems: 'center',
            //borderWidth:1,
            backgroundColor: 'white',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
            margin: 5,
          }}>
          <View
            style={{
              flex: 1,
              flexGrow: 3,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FastImage
              resizeMode="cover"
              style={{
                width: '80%',
                height: '80%',

                borderRadius: 15,
              }}
              source={{uri: item!.strMealThumb!}}></FastImage>
          </View>
          <View
            style={{
              flex: 1,
              flexGrow: 7,
              justifyContent: 'center',
              alignItems: 'flex-start',
              marginLeft: 15,
            }}>
            <Text
              style={{
                fontSize: 22,
                flexWrap: 'wrap',
                flexShrink: 1,
                color: '#e76f51',
              }}>
              {item.strMeal}
            </Text>
          </View>
          <View style={{width: 30, marginRight: 25}}>
            <TouchableOpacity
              onPress={() => {
                setModel(true);
                appContext?.removeUserFav(item.idMeal!, () => setModel(false));
              }}
              style={{
                width: 55,
                height: 55,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialIcons
                name="delete"
                size={38}
                color={fav ? '#9d0208' : '#1c1c1ead'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        ref={flatListRef}
        data={Array.from(appContext?.userFav!, ([name, value]) => {
          return value;
        })}
        renderItem={({item}) => renderCard(item)}></FlatList>
      <LoadModel visible={model} />
    </View>
  );
}
export default Favorite;
