import {DrawerNavigationProp} from '@react-navigation/drawer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  IconButton,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {BackHandler, TouchableOpacity, useWindowDimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MealAPI from '../fetch/MealAPI';
import {MealModel} from '../model/MealModel';
import {
  AppRootStackParamList,
  AppDrawerParamList,
} from '../navigation/AppStack';
import {AppContext} from '../provider/AppProvider';

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
  if (!data) {
    MealAPI.getRandom().then(data => {
      setData(data);
      setFav(false);
    });
    return (
      <Center flex={1}>
        <HStack space={5} justifyContent="center" alignItems={'center'}>
          <Text fontSize={30} color="primary.100">
            Searching new meal!
          </Text>
          <Spinner size={42} />
        </HStack>
      </Center>
    );
  } else if ((data as MealModel).error !== null) {
    return (
      <Center flex={1}>
        <Text
          fontSize={30}
          color="primary.100"
          flexWrap={'wrap'}
          flexShrink={1}
          marginX="10px">
          {(data as MealModel).error}
        </Text>
      </Center>
    );
  }

  return (
    <VStack flex={1}>
      <Box
        h="42px"
        alignItems={'flex-start'}
        marginLeft="10px"
        marginBottom="10px"
        marginTop="10px">
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
          <MaterialIcons name="navigate-before" size={42} color={'#1c1c1ead'} />
        </TouchableOpacity>
      </Box>
      <Box
        flex={1}
        flexGrow={2}
        justifyContent={'center'}
        alignItems={'center'}>
        <Text
          marginX="10px"
          textAlign={'center'}
          fontSize={30}
          color="primary.100"
          flexWrap={'wrap'}
          flexShrink={1}>
          {(data as MealModel)!.strMeal}
        </Text>
        <Text
          marginX="10px"
          textAlign={'center'}
          fontSize={22}
          color="primary.100"
          flexWrap={'wrap'}
          flexShrink={1}>
          {(data as MealModel)!.strCategory}
        </Text>
      </Box>
      <Box
        flex={1}
        flexGrow={8}
        justifyContent={'center'}
        alignItems={'center'}>
        <FastImage
          resizeMode="center"
          style={{
            width: width * 0.9,
            height: width * 0.9,

            borderRadius: 8,
          }}
          source={{uri: (data as MealModel)!.strMealThumb!}}></FastImage>
      </Box>
      <Box flex={1} flexGrow={2} justifyContent={'center'}>
        <HStack justifyContent={'center'} space={'50px'}>
          <IconButton
            variant={'outline'}
            borderWidth={5}
            onPress={() =>
              navigator.navigate('Instruction', {mealData: data as MealModel})
            }
            marginRight={2}
            borderRadius="full"
            icon={
              <Icon
                as={<MaterialIcons name="restaurant-menu" />}
                color={'primary.100'}
                size={'38px'}
              />
            }
          />
          <IconButton
            onPress={onFavorite}
            variant={'outline'}
            borderWidth={5}
            marginRight={2}
            borderRadius="full"
            icon={
              <Icon
                as={<MaterialIcons name="favorite" />}
                color={fav ? '#9d0208' : '#1c1c1ead'}
                size={'38px'}
              />
            }
          />
        </HStack>
      </Box>
      <Box
        marginBottom={'10px'}
        h="80px"
        alignItems={'center'}
        justifyContent={'center'}>
        <Button
          onPress={onAgain}
          w="70%"
          _text={{fontSize: 22}}
          leftIcon={
            <Icon
              as={<MaterialIcons name="refresh" />}
              size={28}
              color="white"
            />
          }>
          New
        </Button>
      </Box>
    </VStack>
  );
}

export default Meal;
