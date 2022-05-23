import {MealModel} from '../../src/model/MealModel';
import {FavMealActionInterface, FavMealActionType} from './types';


export function setLoading(isLoading: boolean): FavMealActionInterface {
  return {
    type: FavMealActionType.SET_LOADING,
    payload: isLoading,
  };
}

export function addFavorite(meal: MealModel): FavMealActionInterface {
  return {
    type: FavMealActionType.ADD_NEW_MEAL_DB,
    payload: meal,
  };
}

export function addBatchFavorite(
  batch: Array<MealModel>,
): FavMealActionInterface {
  return {
    type: FavMealActionType.ADD_BATCH_MEAL,
    payload: batch,
  };
}

export function removeFavorite(id: string): FavMealActionInterface {
  return {
    type: FavMealActionType.REMOVE_BY_ID_DB,
    payload: id,
  };
}


export function removeAllFavorite(): FavMealActionInterface {
  return {
    type: FavMealActionType.REMOVE_ALL_MEAL,
    payload: null,
  };
}

export function fetchRandom() {
  return {
    type: FavMealActionType.FETCH_RANDOM,
    payload: null,
  };
}

export function fetchByID(id: string) {
  return {
    type: FavMealActionType.FETCH_ID,
    payload: id,
  };
}
