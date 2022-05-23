import {MealModel} from '../../src/model/MealModel';

export interface FavMealState {
  id: Array<string> | null;
  data: Array<MealModel> | null;
  isLoading : boolean
}

export enum FavMealActionType {
  ADD_NEW_MEAL = 'ADD_NEW_MEAL',
  ADD_NEW_MEAL_DB = 'ADD_NEW_MEAL_DB',
  ADD_BATCH_MEAL = 'ADD_BATCH_MEAL',
  REMOVE_BY_ID = 'REMOVE_BY_ID',
  REMOVE_BY_ID_DB = 'REMOVE_BY_ID_DB',
  REMOVE_ALL_MEAL = 'REMOVE_ALL_MEAL',
  FETCH_RANDOM = 'FETCH_RANDOM',
  FETCH_ID = 'FETCH_ID',
  SET_LOADING = 'SET_LOADING'
}
export type FavMealAction = FavMealActionType;

export interface FavMealActionInterface {
  type: FavMealAction;
  payload: any;
}
