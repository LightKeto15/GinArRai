import {MealModel} from '../../src/model/MealModel';
import {FavMealActionInterface, FavMealActionType, FavMealState} from './types';

const initalState: FavMealState = {
  id: null,
  data: null,
  isLoading: false,
};

export default function favMealReducer(
  state = initalState,
  action: FavMealActionInterface,
): FavMealState {
  switch (action.type) {
    case FavMealActionType.SET_LOADING:
      return {
        id: state.id,
        data: state.data,
        isLoading: action.payload,
      };
    case FavMealActionType.ADD_NEW_MEAL:
      const mealData = action.payload as MealModel;

      if (!state.id) {
        const newIDList = Array<string>();
        newIDList.push(mealData.idMeal!);

        const newDataList = Array<MealModel>();
        newDataList.push(mealData);

        return {
          id: newIDList,
          data: newDataList,
          isLoading: state.isLoading,
        };
      } else if (state.id && state.id!.indexOf(mealData.idMeal!) === -1) {
        const newIDList = state.id.slice(0);
        const newDataList = state.data!.slice(0);
        newIDList.push(mealData.idMeal!);
        newDataList.push(mealData);
        return {
          id: newIDList,
          data: newDataList,
          isLoading: false,
        };
      }
      return state;

    case FavMealActionType.ADD_BATCH_MEAL:
      const mealDataList = action.payload as Array<MealModel>;

      if (!state.id) {
        const newIDList = Array<string>();
        const newDataList = Array<MealModel>().concat(mealDataList);
        mealDataList.forEach(meal => newIDList.push(meal.idMeal!));

        return {
          id: newIDList,
          data: newDataList,
          isLoading: state.isLoading,
        };
      } else {
        const newIDList = state.id.slice(0);
        const newDataList = state.data!.slice(0);
        for (let index = 0; index < mealDataList.length; index++) {
          const element = mealDataList[index];
          if (!state.id.includes(element.idMeal!)) {
            newIDList.push(element.idMeal!);
            newDataList!.push(element);
          }
        }
        console.log('add2');
        return {
          id: newIDList,
          data: newDataList,
          isLoading: state.isLoading,
        };
      }

    case FavMealActionType.REMOVE_BY_ID:
      if (state.id) {
        const newIDList = Array<string>();
        const newDataList = Array<MealModel>();
        for (let index = 0; index < state.id.length; index++) {
          const element = state.id[index];
          if (element !== action.payload) {
            newIDList.push(element);
            newDataList.push(state.data![index]);
          }
        }

        return {
          id: newIDList,
          data: newDataList,
          isLoading: true,
        };
      }
      return initalState;

    case FavMealActionType.REMOVE_ALL_MEAL:
      return {
        id: null,
        data: null,
        isLoading: state.isLoading,
      };
    default:
      //console.log(action)
      return state;
  }
}
