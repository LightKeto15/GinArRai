import {Box, HStack, IconButton, Icon, Text} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {MealModel} from '../model/MealModel';

interface ItemProps {
  item: MealModel;
  onPress: (item: MealModel) => void;
  onRemove: (item: MealModel) => void;
}

export function FavoriteItemTile(props: ItemProps) {
  return (
    <TouchableOpacity onPress={() => props.onPress(props.item)}>
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
              source={{uri: props.item.strMealThumb!}}></FastImage>
          </Box>
          <Text
            flex={1}
            flexWrap="wrap"
            flexShrink={1}
            fontSize={22}
            color="primary.100">
            {props.item.strMeal}
          </Text>
          <IconButton
            onPress={() => props.onRemove(props.item)}
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
}


export default FavoriteItemTile;