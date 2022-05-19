import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  Box,
  Center,
  Container,
  FlatList,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
  ZStack,
} from 'native-base';
import React, {useContext, useRef, useState} from 'react';
import {TouchableOpacity, useWindowDimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {LoadModel} from '../../components/LoadModal';
import {MealModel} from '../../model/MealModel';
import {AppFavRootStackParamList} from '../../navigation/AppStack';
import {AppContext} from '../../provider/AppProvider';

type FavNavProp = NavigationProp<AppFavRootStackParamList, 'Favorite'>;

function Favorite() {
  const navigator = useNavigation<FavNavProp>();
  const appContext = useContext(AppContext);
  const [model, setModel] = useState(false);
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

  const renderCard = (item: MealModel) => {
    return (
      <TouchableOpacity
        onPress={() => navigator.navigate('InstructionFav', {mealData: item})}>
        <Box m={1} w="full" h={120} shadow={5} bg="white">
          <HStack flex={1} space={5} alignItems="center">
            <Box marginLeft={3} width="30%" height="80%">
              <FastImage
                resizeMode="cover"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 15,
                }}
                source={{uri: item!.strMealThumb!}}></FastImage>
            </Box>
            <Text
              flex={1}
              flexWrap="wrap"
              flexShrink={1}
              fontSize={22}
              color="primary.100">
              {item.strMeal}
            </Text>
            <IconButton
              onPress={() => {
                setModel(true);
                appContext?.removeUserFav(item.idMeal!, () => setModel(false));
              }}
              marginRight={2}
              borderRadius="full"
              icon={
                <Icon
                  as={<MaterialIcons name="delete" />}
                  color={'#1c1c1ead'}
                  size={10}
                />
              }
            />
          </HStack>
        </Box>
      </TouchableOpacity>
    );
  };
  return (
    <VStack flex={1}>
      <FlatList
        flex={1}
        data={Array.from(appContext?.userFav!, ([name, value]) => {
          return value;
        })}
        renderItem={({item}) => renderCard(item)}></FlatList>
      <LoadModel visible={model} />
    </VStack>
  );
}

export default Favorite;
