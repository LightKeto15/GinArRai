import {FirebaseAuthTypes} from '@react-native-firebase/auth';


export interface UserState {
  user: FirebaseAuthTypes.User | null;
  error: string | null
}

export enum UserActionType {
  ADD_USER = 'ADD_USER',
  REMOVE_USER = 'REMOVE_USER',
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  SIGN_OUT = 'SIGN_OUT',
  SET_ERROR = 'SET_ERROR'
}
export type UserAction = UserActionType;

export interface UserActionInterface {
  type: UserAction;
  payload: any;
}

