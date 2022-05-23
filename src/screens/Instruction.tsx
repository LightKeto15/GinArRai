import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Box, HStack, Text, VStack} from 'native-base';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {Platform, TouchableOpacity, useWindowDimensions} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  AppRootStackParamList,
  AppDrawerParamList,
} from '../navigation/AppStack';
import YoutubePlayer from 'react-native-youtube-iframe';
import TabSelectChip from '../components/TabSelectChip';
import IngrePanel from '../components/IngrePanel';
import InstPanel from '../components/InstPanel';

type InstNavProp = NativeStackScreenProps<AppRootStackParamList, 'Instruction'>;
type InstDrawerProp = DrawerNavigationProp<AppDrawerParamList, 'HomeDrawer'>;

function Instruction({route, navigation}: InstNavProp) {
  let mealData = route.params.mealData;
  const navigator = useNavigation();
  const draweragator = navigator.getParent<InstDrawerProp>();
  const {width} = useWindowDimensions();
  const [playing, setPlaying] = useState(false);
  const [tap, setTab] = useState(0);

  // Hide title bar and show again when user leave this page.
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

  //Youtube callback
  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  let textSize = 26 - (mealData.strMeal!.length / 30) * 3;
  return (
    <VStack flex={1} space={1}>
      <Box shadow={5} bg="white" h="70px" alignItems={'flex-start'}>
        <HStack flex={1} justifyContent={'flex-start'} alignItems="center">
          <Box marginLeft="10px" marginBottom="10px" marginTop="10px">
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
          </Box>
          <Text
            marginX={'10px'}
            flex={1}
            fontSize={textSize}
            color="primary.100">
            {mealData.strMeal!}
          </Text>
        </HStack>
      </Box>
      <Box
        flex={1}
        flexGrow={3}
        shadow={5}
        bg="white"
        justifyContent={'center'}
        alignItems="center">
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
        />
      </Box>
      <Box flex={1} flexGrow={6} shadow={5} bg="white">
        <VStack flex={1}>
          <HStack
            h="60px"
            marginTop={'20px'}
            marginX={'20px'}
            justifyContent={'center'}
            alignItems={'center'}
            space={5}>
            <TabSelectChip
              onPress={() => setTab(0)}
              isSelect={tap === 0}
              title="Instruction"
            />
            <TabSelectChip
              onPress={() => setTab(1)}
              isSelect={tap === 1}
              title="Ingredient"
            />
          </HStack>
          <Box flex={1}>
            {tap === 0 ? (
              <InstPanel mealData={mealData} />
            ) : (
              <IngrePanel mealData={mealData} />
            )}
          </Box>
        </VStack>
      </Box>
    </VStack>
  );
}

export default Instruction;
