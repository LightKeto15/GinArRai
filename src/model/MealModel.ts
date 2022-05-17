export interface MealModel {
  idMeal: string | null;
  strMeal: string | null;
  strDrinkAlternate: string | null;
  strCategory: string | null;
  strArea: string | null;
  strInstructions: string | null;
  strMealThumb: string | null;
  strTags: string | null;
  strYoutube: string | null;
  strIngredient: Array<string[]> | null;
  strSource: string | null;
  error: string | null;
}

export function ConvertToModel(mealData: any) {
  let ingreList = Array<string[]>();
  for (let i = 1; i <= 20; i++) {
    if (mealData[`strIngredient${i}`] !== '') {
      ingreList.push([
        mealData[`strIngredient${i}`],
        mealData[`strMeasure${i}`] ?? '',
      ]);
    }
  }
  return {
    idMeal: mealData['idMeal'],
    strMeal: mealData['strMeal'],
    strDrinkAlternate: mealData['strDrinkAlternate'],
    strCategory: mealData['strCategory'],
    strArea: mealData['strArea'],
    strInstructions: mealData['strInstructions'],
    strMealThumb: mealData['strMealThumb'],
    strTags: mealData['strTags'],
    strYoutube: mealData['strYoutube'],
    strIngredient: ingreList,
    strSource: mealData['strSource'],
    error: null
  } as MealModel;
}
