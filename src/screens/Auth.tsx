import React, {useEffect, useState} from 'react';
import {Box, Heading, HStack, Text, VStack} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Keyboard, useWindowDimensions} from 'react-native';
import SignInPanel from '../components/SignInPanel';
import SignUpPanel from '../components/SignUpPanel';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

function Auth() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const {height} = useWindowDimensions();
  const [type, setType] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <KeyboardAwareScrollView style={{backgroundColor: '#e76f51'}}>
      <VStack w="full" h="full">
        <Box
          justifyContent="center"
          alignItems="center"
          w="full"
          h={height * 0.3}>
          <MaterialCommunityIcons name="chef-hat" size={150} color="white" />
        </Box>
        <Box
          shadow="5"
          roundedTop="50"
          w="full"
          h={height * 0.7}
          bgColor="white">
          <Heading alignSelf="center" mt="60" size="xl" color="primary.100">
            {type ? 'Sign in to you account' : 'Create new account'}
          </Heading>

          <VStack flex={1} marginTop="5" marginX="50" space={5}>
            {error ? (
              <Text color="#f00e0e" fontSize={18}>
                {error}
              </Text>
            ) : null}
            {type ? (
              <SignInPanel setErrorAuth={setError} />
            ) : (
              <SignUpPanel setErrorAuth={setError} />
            )}
            <Box flex={1} alignItems="center">
              {!isKeyboardVisible ? (
                <HStack flex={1} justifyContent="flex-end" alignItems="center">
                  <Text fontSize={18}>
                    {type
                      ? "Doesn't have an account?"
                      : 'Already have an account?'}
                  </Text>

                  <Text
                    fontSize={18}
                    marginLeft={2}
                    onPress={() => {
                      setType(!type);
                      setError(null);
                    }}
                    textDecorationLine="underline">
                    {type ? 'Sign up' : 'Sign in'}
                  </Text>
                </HStack>
              ) : null}
            </Box>
          </VStack>
        </Box>
      </VStack>
    </KeyboardAwareScrollView>
  );
}

export default Auth;
