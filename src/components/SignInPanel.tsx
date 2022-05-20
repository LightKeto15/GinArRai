import {Button, FormControl, Icon, Input, VStack} from 'native-base';
import React, {useContext} from 'react';
import {Controller, useForm} from 'react-hook-form';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AppContext} from '../provider/AppProvider';
import {getErrorText} from '../Utility';

interface PropError {
  setErrorAuth: React.Dispatch<React.SetStateAction<string | null>>;
}

function SignInPanel(props: PropError) {
  const appContext = useContext(AppContext);
  const [show, setShow] = React.useState(false);
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
  const onSubmit = async (data: FormType) => {
    let result = await appContext?.SignIn(data.email, data.password)!;
    if (result) {
      props.setErrorAuth(result);
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
}

export default SignInPanel;