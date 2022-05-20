import {Box, FlatList, HStack} from 'native-base';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {MealModel} from '../model/MealModel';

interface Props {
  mealData: MealModel;
}
function IngrePanel(props: Props) {
  const CardTile = (ingre: string, measure: string) => {
    return (
      <Box marginX={3} marginY={1} h="100px" bg="white" shadow={5}>
        <HStack flex={1} justifyContent={'center'} alignItems={'center'}>
          <Box flex={1} flexGrow={3} marginY={2} marginX={2}>
            <FastImage
              resizeMode="cover"
              style={{
                width: '100%',
                height: '100%',

                borderRadius: 2,
              }}
              source={{
                uri: `http://www.themealdb.com/images/ingredients/${ingre}.png`,
              }}></FastImage>
          </Box>
          <Box
            flex={1}
            flexGrow={5}
            justifyContent={'center'}
            _text={{fontSize: 22, flexWrap: 'wrap', flexShrink: 1,textAlign: 'center'}}>
            {ingre}
          </Box>
          <Box
            flex={1}
            flexGrow={2}
            justifyContent={'center'}
            _text={{fontSize: 18,flexWrap: 'wrap', flexShrink: 1,textAlign: 'center'}}>
            {measure}
          </Box>
        </HStack>
      </Box>
    );
  };
  return (
    <FlatList
      marginBottom={'10px'}
      data={props.mealData.strIngredient}
      renderItem={({item}) => CardTile(item[0], item[1])}
    />
  );
}

export default IngrePanel;
