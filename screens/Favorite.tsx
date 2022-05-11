import React, {useContext} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import {MealModel} from '../model/MealModel';
import {AppContext} from '../provider/AppProvider';

function Favorite() {
  const appContext = useContext(AppContext);

  if (!appContext?.userFav) {
    return (
      <View>
        <Text>No data</Text>
      </View>
    );
  }

  const renderCard = (item: MealModel) => {
    return (
      <View
        style={{flex: 1, height: 120, borderWidth: 2, flexDirection: 'row'}}>
        <Image
          style={{
            width: 120,
            height: 120,
            resizeMode: 'stretch',
          }}
          source={{uri: item!.strMealThumb!}}></Image>
        <Text style={{fontSize: 22, flexWrap: 'wrap', flexShrink: 1}}>
          {item.strMeal}
        </Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={Array.from(appContext.userFav, ([name, value]) => value)}
        renderItem={({item}) => renderCard(item)}></FlatList>
    </View>
  );
}

export default Favorite;
