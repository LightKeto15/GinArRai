import { RootState } from "..";

 export function getFavorite(state:RootState)
 {
     return state.favMealReducer.data;
 }

 export function getFavoriteID(state:RootState)
 {
     return state.favMealReducer.id;
 }
 export function isFavorite(state:RootState,id :string)
 {
     console.log(id)
     return state.favMealReducer.id?.includes(id);
 }

 export function isLoading(state:RootState,)
 {
     return state.favMealReducer.isLoading;
 }