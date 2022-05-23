import {Box, Button, FormControl, Icon, Input, VStack} from 'native-base';
import React, {useContext} from 'react';
import {Controller, useForm} from 'react-hook-form';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../redux/user/actions';
import {AppContext} from '../provider/AppProvider';
import {getErrorText} from '../Utility';

interface PropError {
  setErrorAuth: React.Dispatch<React.SetStateAction<string | null>>;
}

function SignUpPanel() {
  //const appContext = useContext(AppContext);
  const dispatch = useDispatch()
  const [showP1, setP1] = React.useState(false);
  const [showP2, setP2] = React.useState(false);
  type FormType = {
    email: string;
    password: string;
    rePassword: string;
  };
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
      setError('password', {type: 'match'});
    } else {
       //await appContext!.SignUp(data.email, data.password);
       dispatch(signUpUser(data.email, data.password))
    }
  };
  return (
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
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              InputRightElement={
                <Icon
                  as={
                    <MaterialIcons
                      name={showP1 ? 'visibility' : 'visibility-off'}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                  onPress={() => setP1(!showP1)}
                />
              }
              type={showP1 ? 'text' : 'password'}
            />
            {errors.password ? (
              <FormControl.ErrorMessage>
                {getErrorText(errors.password.type)}
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="rePassword"
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
              Password again
            </FormControl.Label>
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              InputRightElement={
                <Icon
                  as={
                    <MaterialIcons
                      name={showP2 ? 'visibility' : 'visibility-off'}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                  onPress={() => setP2(!showP2)}
                />
              }
              type={showP2 ? 'text' : 'password'}
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
        Sign up
      </Button>
    </VStack>
  );
}

export default SignUpPanel;
