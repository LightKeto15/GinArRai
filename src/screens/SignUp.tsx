import {NavigationProp} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Text, TextInput, View} from 'react-native';
import {TileButton} from '../components/TileButton';
import {AuthRootStackParamList} from '../navigation/AuthStack';
import {AppContext} from '../provider/AppProvider';
import {MainStyle} from '../styles/MainStyle';
import {getErrorText} from '../Utility';

type FormType = {
  email: string;
  password: string;
  rePassword: string;
};

function SignUp() {
  const appContext = useContext(AppContext);
  const [error, setErrorAuth] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm<FormType>({
    defaultValues: {
      email: '',
      password: '',
      rePassword: '',
    },
  });
  const onSubmit = async (data: FormType) => {
    if (data.password !== data.rePassword) {
      setError('rePassword', {type: 'match'});
    } else {
      let result = await appContext!.SignUp(data.email, data.password);
      if (result) {
        setErrorAuth(result);
      }
    }
  };

  return (
    <View>
      <View style={{marginHorizontal: 50, marginVertical: 30}}>
        <Text style={[MainStyle.text, {fontSize: 30, fontWeight: '500'}]}>
          Register
        </Text>
      </View>
      {error ? (
        <Text style={[MainStyle.errorText, {marginVertical: 10}]}>{error}</Text>
      ) : null}
      <View style={{marginVertical: 10}}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <View
              style={[
                MainStyle.textBox,
                {borderColor: errors.email ? 'red' : '#cfd1d0'},
              ]}>
              <TextInput
                placeholder="Email Address"
                style={{fontSize: 15}}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
          name="email"
        />
      </View>
      {errors.email && (
        <Text style={MainStyle.errorText}>This is required.</Text>
      )}

      <View style={{marginVertical: 10}}>
        <Controller
          control={control}
          rules={{
            minLength: 8,
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <View
              style={[
                MainStyle.textBox,
                {borderColor: errors.password ? 'red' : '#cfd1d0'},
              ]}>
              <TextInput
                placeholder="Password"
                secureTextEntry={true}
                style={{fontSize: 15}}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
          name="password"
        />
        {errors.password ? (
          <Text style={MainStyle.errorText}>
            {getErrorText(errors.password.type)}
          </Text>
        ) : null}
      </View>
      <View style={{marginVertical: 10}}>
        <Controller
          control={control}
          rules={{
            minLength: 8,
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <View
              style={[
                MainStyle.textBox,
                {borderColor: errors.rePassword ? 'red' : '#cfd1d0'},
              ]}>
              <TextInput
                placeholder="Password again"
                secureTextEntry={true}
                style={{fontSize: 15}}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
          name="rePassword"
        />
      </View>
      {errors.rePassword ? (
        <Text style={MainStyle.errorText}>
          {getErrorText(errors.rePassword.type)}
        </Text>
      ) : null}
      <View
        style={{
          width: '75%',
          height: 60,
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: '3%',
        }}>
        <TileButton
          onPress={handleSubmit<FormType>(onSubmit)}
          text="Create new acoount"
        />
      </View>
    </View>
  );
}

export default SignUp;
