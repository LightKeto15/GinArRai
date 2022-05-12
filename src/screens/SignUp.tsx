import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Button, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {AuthRootStackParamList} from '../navigation/AuthStack';
import {AppContext} from '../provider/AppProvider';
type SignUpNavProp = NavigationProp<AuthRootStackParamList, 'SignIn'>;

type FormType = {
  email: string;
  password: string;
  rePassword: string;
};

function SignUp() {
  const navigator = useNavigation<SignUpNavProp>();
  const appContext = useContext(AppContext);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormType>({
    defaultValues: {
      email: '',
      password: '',
      rePassword: '',
    },
  });
  const onSubmit = (data: FormType) =>
    appContext!.SignUp(data.email, data.password);
  return (
    <View>
      <TouchableOpacity onPress={() => navigator.goBack()}>
        <Text>Back</Text>
      </TouchableOpacity>
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
      <Controller
        control={control}
        rules={{
          minLength: 8,
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="rePassword"
      />
      {errors.rePassword ? <Text>{errors.rePassword.type}</Text> : null}
      <Button
        title="Create new acoount"
        onPress={handleSubmit<FormType>(onSubmit)}
      />
    </View>
  );
}

export default SignUp;
