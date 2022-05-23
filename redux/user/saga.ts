import {all, call, fork, put, takeEvery, takeLeading} from 'redux-saga/effects';
import {UserActionInterface, UserActionType} from './types';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {setUserAuthError} from './actions';
import firestore from '@react-native-firebase/firestore';

function* userAuthSignOut() {
  try {
    yield call(() => auth().signOut());
  } catch (e) {
    yield put(setUserAuthError(e as FirebaseAuthTypes.NativeFirebaseAuthError));
  }
}

function* userAuthSignIn(action: UserActionInterface) {
  const email = action.payload.email;
  const password = action.payload.password;
  try {
    yield call(() => auth().signInWithEmailAndPassword(email, password));
  } catch (e) {
    yield put(setUserAuthError(e as FirebaseAuthTypes.NativeFirebaseAuthError));
  }
}

function* userAuthSignUp(action: UserActionInterface) {
  const email = action.payload.email;
  const password = action.payload.password;
  try {
    const data: FirebaseAuthTypes.UserCredential = yield call(() =>
      auth().createUserWithEmailAndPassword(email, password),
    );
    yield call(() => {
      firestore()
        .collection('Users')
        .doc(data.user.uid)
        .set({favList: Array<string>()});
    });
  } catch (e) {
    yield put(setUserAuthError(e as FirebaseAuthTypes.NativeFirebaseAuthError));
  }
}

export function* signOutSaga() {
  yield takeLeading(UserActionType.SIGN_OUT, userAuthSignOut);
}

export function* signInSaga() {
  yield takeLeading(UserActionType.SIGN_IN, userAuthSignIn);
}

export function* signUpSaga() {
  yield takeLeading(UserActionType.SIGN_UP, userAuthSignUp);
}

