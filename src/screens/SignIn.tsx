import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthRootStackParamList} from '../navigation/AuthStack';
import {AppContext} from '../provider/AppProvider';

import {useForm, Controller} from 'react-hook-form';
import {MainStyle} from '../styles/MainStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TileButton} from '../components/TileButton';
import SignUp from './SignUp';
import {getErrorText} from '../Utility';

type FormType = {
  email: string;
  password: string;
};

function SignIn() {
  const appContext = useContext(AppContext);
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
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

  const getSignInPanel = () => {
    return (
      <View>
        <View style={{marginHorizontal: 50, marginVertical: 30}}>
          <Text style={[MainStyle.text, {fontSize: 30, fontWeight: '500'}]}>
            Sign in to you account
          </Text>
        </View>
        {error ? (
          <Text style={[MainStyle.errorText, {marginVertical: 10}]}>
            {error}
          </Text>
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
        </View>

        {errors.password ? (
          <Text style={MainStyle.errorText}>
            {getErrorText(errors.password.type)}
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
            text="Sign In"
          />
        </View>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      style={{
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#e76f51',
      }}>
      <View
        style={{
          flex: 1,
          flexGrow: 3,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <MaterialCommunityIcons name="chef-hat" size={150} color="white" />
        </View>
      </View>

      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          flexGrow: 7,
          width: '100%',
          justifyContent: 'flex-start',
          borderTopLeftRadius: 38,
          borderTopRightRadius: 38,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.8,

          elevation: 5,
        }}>
        <View style={{flex: 1, flexGrow: 9, marginTop: '5%'}}>
          {type ? getSignInPanel() : <SignUp />}
        </View>
        <View style={{flex: 1, flexGrow: 2}}>
          {isKeyboardVisible ? null : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={[MainStyle.text, {fontSize: 20}]}>
                {type
                  ? " Doesn't have an account?"
                  : 'Already have an account?'}
              </Text>
              <TouchableOpacity
                style={{marginLeft: '2%'}}
                onPress={() => setType(!type)}>
                <Text
                  style={[
                    MainStyle.text,
                    {fontSize: 20, textDecorationLine: 'underline'},
                  ]}>
                  {type ? 'Register' : 'Sign In'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default SignIn;
