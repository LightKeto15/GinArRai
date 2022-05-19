import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  Box,
  Button,
  Center,
  Circle,
  Container,
  Pressable,
  Text,
  VStack,
  ZStack,
} from 'native-base';
import React from 'react';
import {TouchableOpacity, useWindowDimensions} from 'react-native';
import {AppRootStackParamList} from '../../navigation/AppStack';

type HomeNavProp = NavigationProp<AppRootStackParamList, 'Home'>;

function Home() {
  const navigator = useNavigation<HomeNavProp>();

  const {width, height} = useWindowDimensions();
  return (
    <ZStack justifyContent={'flex-start'} flex={1}>
      <Box w="full" h="full">
        <Center>
          <TouchableOpacity onPress={() => navigator.navigate('Meal')}>
            <ZStack flex={1} alignItems={'center'} justifyContent={'center'}>
              <Circle size={width * 0.45} bg="primary.100" />
              <Circle size={width * 0.42} bg="white" />
              <Circle size={width * 0.39} bg="primary.100">
                <Text fontSize={60} color="white">
                  GO
                </Text>
              </Circle>
            </ZStack>
          </TouchableOpacity>
        </Center>
      </Box>
      <Box w="full" h={height * 0.6}>
        <VStack flex={1} justifyContent="center" alignItems={'center'}>
          <Text color="primary.100" fontSize={30}>
            Discover a delicious meal!
          </Text>
        </VStack>
      </Box>
    </ZStack>
  );
}

export default Home;
