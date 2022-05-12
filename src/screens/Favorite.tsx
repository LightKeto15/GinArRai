import {useFocusEffect} from '@react-navigation/native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {FlatList, Image, RefreshControl, Text, View} from 'react-native';
import {MealModel} from '../model/MealModel';
import {AppContext} from '../provider/AppProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
function Favorite() {
  const appContext = useContext(AppContext);
  const flatListRef = useRef<FlatList<MealModel> | null>(null);

  if (!appContext?.userFav) {
    //console.log(`A3:${appContext?.userFav!.size}`);
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
         <MaterialCommunityIcons
              name="emoticon-sad-outline"
              size={80}
              color={'#e76f51'}
            />
        <Text style={{fontSize: 28,fontWeight:'500', color: '#e76f51',marginTop:20}}>No favorite meal!</Text>
      </View>
    );
  }

  const renderCard = (item: MealModel) => {
    return (
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
          <Image
            style={{
              width: '80%',
              height: '80%',
              resizeMode: 'cover',
              borderRadius: 15,
            }}
            source={{uri: item!.strMealThumb!}}></Image>
        </View>
        <View
          style={{
            flex: 1,
            flexGrow: 7,
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginLeft: 15,
          }}>
          <Text style={{fontSize: 22, flexWrap: 'wrap', flexShrink: 1,color:"#e76f51"}}>
            {item.strMeal}
          </Text>
        </View>
      </View>
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
    </View>
  );
}
export default Favorite;
