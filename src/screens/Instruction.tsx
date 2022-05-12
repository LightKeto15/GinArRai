import {NavigationProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
import {
  Alert,
  Platform,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {MealModel} from '../model/MealModel';
import {AppRootStackParamList} from '../navigation/AppStack';
import YoutubePlayer from 'react-native-youtube-iframe';
type InstNavProp = NativeStackScreenProps<AppRootStackParamList, 'Instruction'>;

function Instruction({route, navigation}: InstNavProp) {
  let mealData = route.params.mealData;
  const {width} = useWindowDimensions();
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <View
        style={{
          flex: 1,
          width: width,
          flexGrow: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          marginLeft: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialIcons name="navigate-before" size={42} color={'#1c1c1ead'} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          flexGrow: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <YoutubePlayer
        webViewStyle={{opacity: 0.99}}
        webViewProps={{
            androidLayerType:
            Platform.OS === 'android' && Platform.Version <= 22 ? 'hardware' : 'none',
            renderToHardwareTextureAndroid: true,
          }}
        height={300}
        play={playing}
        videoId={mealData.strYoutube?.split('=')[1]}
        onChangeState={onStateChange}
      />
      </View>
      <View style={{flex: 1, flexGrow: 5}}></View>
    </View>
  );
}

export default Instruction;
/* */
