import {Box, Pressable, ScrollView, VStack} from 'native-base';
import React from 'react';
import {Linking} from 'react-native';
import {Text} from 'react-native-svg';
import {MealModel} from '../model/MealModel';

interface Props {
  mealData: MealModel;
}

function InstPanel(props: Props) {
  return (
    <ScrollView>
      <Pressable
        marginRight={'30px'}
        alignSelf={'flex-end'}
        onPress={() => Linking.openURL(props.mealData.strSource!)}>
        <Box _text={{fontSize: 18, textDecorationLine: 'underline'}}>
          Source
        </Box>
      </Pressable>
      <Box margin={5} _text={{fontSize: 18}}>
        {props.mealData.strInstructions}
      </Box>
    </ScrollView>
  );
}

export default InstPanel;
