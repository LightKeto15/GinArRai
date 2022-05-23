import {combineReducers, createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {all, fork} from 'redux-saga/effects';
import favMealReducer from './fav-meal/reducer';
import userReducer from './user/reducer';
import {signInSaga, signOutSaga, signUpSaga} from './user/saga';
import {addFavSaga, fechIDSaga, removeFavSaga} from './fav-meal/sage';
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  favMealReducer,
  userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

function configureStore() {
  return createStore(rootReducer, applyMiddleware(sagaMiddleware));
}

function* authRootSaga() {
  yield all([
    fork(signInSaga),
    fork(signUpSaga),
    fork(signOutSaga),
    fork(fechIDSaga),
    fork(removeFavSaga),
    fork(addFavSaga)
  ]);
}

export function runSaga() {
  sagaMiddleware.run(authRootSaga);
}

export default configureStore;
