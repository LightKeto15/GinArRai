import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {Button, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {AuthRootStackParamList} from '../navigation/AuthStack';
import {AppContext} from '../provider/AppProvider';

import {useForm, Controller} from 'react-hook-form';

type SignInNavProp = NavigationProp<AuthRootStackParamList, 'SignIn'>;
type FormType = {
  email: string;
  password: string;
};
function SignIn() {
  const navigator = useNavigation<SignInNavProp>();
  const appContext = useContext(AppContext);
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
  const onSubmit = (data: FormType) =>
    appContext?.SignIn(data.email, data.password);

  return (
    <View style={{justifyContent: 'center'}}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="email"
      />
      {errors.email && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          minLength: 8,
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="password"
      />
      {errors.password ? <Text>{errors.password.type}</Text> : null}
      <Button title="Sign In" onPress={handleSubmit<FormType>(onSubmit)} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Does not have an account?</Text>
        <TouchableOpacity
          style={{marginLeft: '2%'}}
          onPress={() => navigator.navigate('SignUp')}>
          <Text>Register now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SignIn;
