import MealAPI from '../../src/fetch/MealAPI';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {FavMealActionInterface, FavMealActionType} from './types';

import {addBatchFavorite, setLoading} from './actions';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {getUID} from '../user/selectors';
import {MealModel} from '../../src/model/MealModel';
import {getFavoriteID} from './selectors';

// Fetch user favorite meal by user id from firebase
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

// Remove user favorite from meal ID
function* removeFavDB(action: FavMealActionInterface) {
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
// add user favorite from meal ID
function* addFavDB(action: FavMealActionInterface) {
  const check: string[] = yield select(getFavoriteID);
  const uid: string = yield select(getUID);
  if (!check.includes(action.payload.idMeal)) {
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
