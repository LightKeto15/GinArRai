import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {
  Alert,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  AppDrawerParamList,
  AppRootStackParamList,
} from '../navigation/AppStack';
import YoutubePlayer from 'react-native-youtube-iframe';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import {DrawerNavigationProp} from '@react-navigation/drawer';

type InstNavProp = NativeStackScreenProps<AppRootStackParamList, 'Instruction'>;
type InstDrawerProp = DrawerNavigationProp<AppDrawerParamList, 'HomeDrawer'>;

function Instruction({route, navigation}: InstNavProp) {
  let mealData = route.params.mealData;
  const navigator = useNavigation();
  const draweragator = navigator.getParent<InstDrawerProp>();
  const {width} = useWindowDimensions();
  const sizeRef = useRef<View>(null);
  const [playing, setPlaying] = useState(false);
  const [tap, setTab] = useState(0);

  useLayoutEffect(() => {
    draweragator.setOptions({
      title: '',
      headerTransparent: true,
      headerShown: false,
    });
    return () => {
      const {index, routeNames} = draweragator.getState();
      if (routeNames[index] === 'HomeDrawer') {
        return draweragator.setOptions({
          title: '',
          headerTransparent: true,
          headerShown: false,
        });
      } else {
        return draweragator.setOptions({
          title: 'Favorite',
          headerTransparent: false,
          headerShown: true,
        });
      }
    };
  }, []);
  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);
  const onReady = () => {
  };

  const onTabPress = (idx: number) => {
    setTab(idx);
  };
  let textSize = 26 - (mealData.strMeal!.length / 30) * 3;

  const renderCard = (ingre: string, measure: string) => {
    return (
      <View
        style={{
          flex: 1,
          height: 100,

          flexDirection: 'row',
          justifyContent: 'center',
          shadowColor: '#000',
          alignItems: 'center',
          //borderWidth:1,
          backgroundColor: 'white',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
          marginHorizontal: '3%',
          marginVertical: 8,
        }}>
        <View
          style={{
            flex: 1,
            flexGrow: 2,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
          }}>
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
        </View>
        <View
          style={{
            flex: 1,
            flexGrow: 7,
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginLeft: 15,
            flexDirection: 'row',
          }}>
          <View style={{flex: 1, flexGrow: 8}}>
            <Text
              style={{
                fontSize: 22,
                flexWrap: 'wrap',
                flexShrink: 1,
                color: '#1c1c1ead',
              }}>
              {ingre}
            </Text>
          </View>
          <View style={{flex: 1, flexGrow: 5}}>
            <Text
              style={{
                fontSize: 18,
                flexWrap: 'wrap',
                flexShrink: 1,
                color: '#1c1c1ead',
                marginVertical: 8,
                marginHorizontal: 8,
              }}>
              {measure}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const onInstTab = () => {
    return (
      <View style={{marginHorizontal: 25, marginVertical: 10}}>
        <ScrollView>
          {mealData.strSource ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                width: '100%',
                marginBottom: 10,
              }}>
              <TouchableOpacity
                onPress={() => Linking.openURL(mealData.strSource!)}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '500',
                    textDecorationLine: 'underline',
                    marginRight: 10,
                  }}>
                  Source
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
          <Text style={{fontSize: 18}}>{mealData.strInstructions}</Text>
        </ScrollView>
      </View>
    );
  };
  const onIngreTab = () => {
    return (
      <View style={{marginHorizontal: 25, marginVertical: 10}}>
        <FlatList
          data={mealData.strIngredient}
          renderItem={({item}) => renderCard(item[0], item[1])}></FlatList>
      </View>
    );
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1, flexDirection: 'column'}}>
      <View
        style={{
          flex: 1,
          width: width,
          flexGrow: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginLeft: 10,
          flexDirection: 'row',
        }}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialIcons
              name="navigate-before"
              size={42}
              color={'#1c1c1ead'}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '5%',
            padding: 10,
          }}>
          <Text
            style={{
              flexWrap: 'wrap',
              flexShrink: 1,
              textAlign: 'center',
              fontSize: textSize,
              color: '#e76f51',
            }}>
            {mealData.strMeal!}
          </Text>
        </View>
      </View>
      <View
        ref={sizeRef}
        style={{
          flex: 1,
          flexGrow: 3,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          backgroundColor: 'white',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
          margin: 5,
        }}>
        <YoutubePlayer
          webViewStyle={{opacity: 0.99}}
          webViewProps={{
            androidLayerType:
              Platform.OS === 'android' && Platform.Version <= 22
                ? 'hardware'
                : 'none',
            renderToHardwareTextureAndroid: true,
          }}
          height={((width * 0.9) / 16) * 9}
          width={width * 0.9}
          play={playing}
          videoId={mealData.strYoutube?.split('=')[1]}
          onChangeState={onStateChange}
          onReady={onReady}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexGrow: 6,
          shadowColor: '#000',
          backgroundColor: 'white',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
          margin: 5,
        }}>
        <View
          style={{
            flex: 1,
            flexGrow: 1,
            flexDirection: 'row',
            marginHorizontal: 10,
            marginVertical: 20,
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: tap === 0 ? '#f4a261' : 'white',
              borderWidth: 3,
              borderColor: tap === 0 ? '#e76f51' : '#1c1c1ead',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '7%',
              marginRight: '2%',
            }}>
            <TouchableOpacity onPress={() => onTabPress(0)}>
              <Text
                style={{
                  fontSize: 20,
                  color: tap === 0 ? 'white' : '#1c1c1ead',
                }}>
                Instruction
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: tap === 1 ? '#f4a261' : 'white',
              borderWidth: 3,
              borderColor: tap === 1 ? '#e76f51' : '#1c1c1ead',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: '7%',
              marginLeft: '2%',
            }}>
            <TouchableOpacity onPress={() => onTabPress(1)}>
              <Text
                style={{
                  fontSize: 20,
                  color: tap === 1 ? 'white' : '#1c1c1ead',
                }}>
                Ingredient
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, flexGrow: 10, marginBottom: 10}}>
          {tap === 0 ? onInstTab() : onIngreTab()}
        </View>
      </View>
    </View>
  );
}

export default Instruction;
