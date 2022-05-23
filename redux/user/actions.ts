import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {UserActionInterface, UserActionType} from './types';

export function setUserAuthError(
  error: FirebaseAuthTypes.NativeFirebaseAuthError | null,
): UserActionInterface {
  return {
    type: UserActionType.SET_ERROR,
    payload: error,
  };
}

export function addUser(
  user: FirebaseAuthTypes.User | null,
): UserActionInterface {
  return {
    type: UserActionType.ADD_USER,
    payload: user,
  };
}
export function removeUser(): UserActionInterface {
  return {
    type: UserActionType.REMOVE_USER,
    payload: null,
  };
}

export function signInUser(
  email: string,
  password: string,
): UserActionInterface {
  return {
    type: UserActionType.SIGN_IN,
    payload: {
      email: email,
      password: password,
    },
  };
}
export function signUpUser(
  email: string,
  password: string,
): UserActionInterface {
  return {
    type: UserActionType.SIGN_UP,
    payload: {
      email: email,
      password: password,
    },
  };
}
export function signOutUser(): UserActionInterface {
  return {
    type: UserActionType.SIGN_OUT,
    payload: null,
  };
}
