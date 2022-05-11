import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {AppRootStackParamList} from '../navigation/AppStack';
import {AppContext} from '../provider/AppProvider';

type HomeNavProp = NavigationProp<AppRootStackParamList, 'Home'>;

function Home() {
  const navigator = useNavigation<HomeNavProp>();
  const appContext = useContext(AppContext);
  return (
    <View>
      <TouchableOpacity onPress={() => appContext?.SignOut()}>
        <Text>Out</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigator.navigate('Meal')}>
        <Text>Go</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigator.navigate('Favorite')}>
        <Text>Fav</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Home;
