import MealAPI from '../../src/fetch/MealAPI';
import {
  call,
  put,
  select,
  takeEvery,
  takeLatest,
  takeLeading,
} from 'redux-saga/effects';
import {
  FavMealAction,
  FavMealActionInterface,
  FavMealActionType,
} from './types';

import {
  addBatchFavorite,
  addFavorite,
  removeFavorite,
  setLoading,
} from './action';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {getUID, getUser} from '../user/selector';
import {MealModel} from '../../src/model/MealModel';
import {getFavorite, getFavoriteID, isFavorite} from './selectors';
function* fetchByID(action: FavMealActionInterface) {
  yield put(setLoading(true));
  const udata: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData> =
    yield call(() => firestore().collection('Users').doc(action.payload).get());
  const meals: MealModel[] = yield call(
    async () =>
      await MealAPI.batchRequest(udata.data()!['favList'] as Array<string>),
  );
  yield put(addBatchFavorite(meals));
  yield put(setLoading(false));
}

export function* fechIDSaga() {
  yield takeEvery(FavMealActionType.FETCH_ID, fetchByID);
}
function* removeFavDB(action: FavMealActionInterface) {
  //let y = firestore().collection('Users').doc('uid');
  const uid: string = yield select(getUID);
  yield put(setLoading(true));
  const user: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData> =
    yield call(() => firestore().collection('Users').doc(uid));
  const uDocs: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData> =
    yield call(() => user.get());
  const nList: Array<string> = yield call(() => {
    let sData = uDocs.data()!;
    let sList = sData['favList'] as Array<string>;
    let index = sList.indexOf(action.payload);
    if (index > -1) {
      let nList = Array<string>();
      for (const it of sList) {
        if (it !== action.payload) {
          nList.push(it);
        }
      }
      //console.log(nList);
      return nList;
    }
  });
  yield call(() => user.set({favList: nList}));
  yield put({
    type: FavMealActionType.REMOVE_BY_ID,
    payload: action.payload,
  });
  yield put(setLoading(false));
}
export function* removeFavSaga() {
  yield takeEvery(FavMealActionType.REMOVE_BY_ID_DB, removeFavDB);
}

function* addFavDB(action: FavMealActionInterface) {
  const check: string[] = yield select(getFavoriteID);
  const uid: string = yield select(getUID);
  //console.log('add1');
  if (!check.includes(action.payload.idMeal)) {
    //yield call(() => console.log('add2'));
    const user: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData> =
      yield call(() => firestore().collection('Users').doc(uid));
    yield call(() => user.set({favList: [...check, action.payload.idMeal]}));
    yield put({
      type: FavMealActionType.ADD_NEW_MEAL,
      payload: action.payload,
    });
  }
}
export function* addFavSaga() {
  yield takeEvery(FavMealActionType.ADD_NEW_MEAL_DB, addFavDB);
}
