import React, {useContext, useEffect, useState} from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  Spacer,
  Text,
  useMediaQuery,
  VStack,
  ZStack,
  KeyboardAvoidingView,
  Icon,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Keyboard, Platform, useWindowDimensions} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {getErrorText} from '../../Utility';
import SignUp from './SignUp';
import {AppContext} from '../../provider/AppProvider';
import {MainStyle} from '../../styles/MainStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function SignIn() {
  const appContext = useContext(AppContext);
  const [show, setShow] = React.useState(false);
  const {height} = useWindowDimensions();
  type FormType = {
    email: string;
    password: string;
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormType>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [type, setType] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
  const onSubmit = async (data: FormType) => {
    let result = await appContext?.SignIn(data.email, data.password)!;
    if (result) {
      setError(result);
    }
  };
  const getSignInPanel = () => (
    <VStack space={5}>
      <Controller
        control={control}
        name="email"
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <FormControl isInvalid={errors.email ? true : false}>
            <FormControl.Label
              _text={{
                fontSize: 20,
              }}>
              Email address
            </FormControl.Label>
            <Input onBlur={onBlur} onChangeText={onChange} value={value} />
            {errors.email ? (
              <FormControl.ErrorMessage>
                {getErrorText(errors.email.type)}
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{
          minLength: 8,
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <FormControl isInvalid={errors.password ? true : false}>
            <FormControl.Label
              _text={{
                fontSize: 20,
              }}>
              Password
            </FormControl.Label>
            <Input
              InputRightElement={
                <Icon
                  as={
                    <MaterialIcons
                      name={show ? 'visibility' : 'visibility-off'}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                  onPress={() => setShow(!show)}
                />
              }
              type={show ? 'text' : 'password'}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {errors.password ? (
              <FormControl.ErrorMessage>
                {getErrorText(errors.password.type)}
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>
        )}
      />
      <Button _text={{fontSize: 18}} onPress={handleSubmit<FormType>(onSubmit)}>
        Sign in
      </Button>
    </VStack>
  );
  return (
    <KeyboardAvoidingView flex={1} bgColor="primary.100">
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
            {type ? getSignInPanel() : <SignUp setErrorAuth={setError} />}
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
    </KeyboardAvoidingView>
  );
}

export default SignIn;
