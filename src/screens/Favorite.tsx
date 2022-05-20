import {NavigationProp, useNavigation} from '@react-navigation/native';
import {FlatList, Icon, Text, VStack} from 'native-base';
import React, {useContext, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FavoriteItemTile} from '../components/FavoriteItemTile';
import {LoadModel} from '../components/LoadModal';
import {MealModel} from '../model/MealModel';
import {AppFavRootStackParamList} from '../navigation/AppStack';
import {AppContext} from '../provider/AppProvider';

type FavNavProp = NavigationProp<AppFavRootStackParamList, 'Favorite'>;

function Favorite() {
  const navigator = useNavigation<FavNavProp>();
  const appContext = useContext(AppContext);
  const [model, setModel] = useState(false);

  const onTilePress = (item: MealModel) => {
    navigator.navigate('InstructionFav', {mealData: item});
  };
  const onTileRemove = (item: MealModel) => {
    setModel(true);
    appContext?.removeUserFav(item.idMeal!, () => setModel(false));
  };

  if (!appContext?.userFav || appContext?.userFav.size == 0) {
    return (
      <VStack flex={1} justifyContent="center" alignItems={'center'}>
        <Icon
          as={<MaterialCommunityIcons name="emoticon-sad-outline" />}
          color={'#e76f51'}
          size="80px"
        />
        <Text marginBottom={'20%'} fontSize={28} color="primary.100">
          No favorite meal!
        </Text>
      </VStack>
    );
  }

  return (
    <VStack flex={1}>
      <FlatList
        flex={1}
        data={Array.from(appContext?.userFav!, ([name, value]) => {
          return value;
        })}
        renderItem={({item}) => (
          <FavoriteItemTile
            item={item}
            onPress={onTilePress}
            onRemove={onTileRemove}
          />
        )}></FlatList>
      <LoadModel visible={model} />
    </VStack>
  );
}

export default Favorite;
