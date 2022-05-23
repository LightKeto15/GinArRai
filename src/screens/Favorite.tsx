import {NavigationProp, useNavigation} from '@react-navigation/native';
import {FlatList, Icon, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {removeFavorite} from '../../redux/fav-meal/actions';
import {getFavorite} from '../../redux/fav-meal/selectors';
import {FavoriteItemTile} from '../components/FavoriteItemTile';
import {LoadModel} from '../components/LoadModal';
import {MealModel} from '../model/MealModel';
import {AppFavRootStackParamList} from '../navigation/AppStack';

type FavNavProp = NavigationProp<AppFavRootStackParamList, 'Favorite'>;

function Favorite() {
  const navigator = useNavigation<FavNavProp>();
  const userFav = useSelector(getFavorite);
  const dispatch = useDispatch();

  const onTilePress = (item: MealModel) => {
    navigator.navigate('InstructionFav', {mealData: item});
  };

  const onTileRemove = (item: MealModel) => {
    dispatch(removeFavorite(item.idMeal!));
  };

  if (!userFav || userFav.length === 0) {
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
        data={userFav}
        renderItem={({item}) => (
          <FavoriteItemTile
            item={item}
            onPress={onTilePress}
            onRemove={onTileRemove}
          />
        )}></FlatList>
    </VStack>
  );
}

export default Favorite;
