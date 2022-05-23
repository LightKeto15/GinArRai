import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {UserState, UserActionInterface, UserActionType} from './types';

const initalState: UserState = {
  user: null,
  error: null,
};

export default function userReducer(
  state = initalState,
  action: UserActionInterface,
): UserState {
  switch (action.type) {
    case UserActionType.ADD_USER:
      return {user: action.payload, error: null};
    case UserActionType.REMOVE_USER:
      return initalState;
    case UserActionType.SET_ERROR:
      let authError =
        action.payload as FirebaseAuthTypes.NativeFirebaseAuthError;
      return {
        user: state.user,
        error: authError
          ? authError.message.replace(`[${authError.code}] `, '')
          : null,
      };
    default:
      return state;
  }
}
