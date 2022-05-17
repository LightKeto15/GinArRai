import {ConvertToModel, MealModel} from '../model/MealModel';

class MealAPIFetch {
  public static async getById(id: string): Promise<MealModel | null> {
    console.log(id);
    const url = `http://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      let json = await response.json();

      return ConvertToModel(json['meals'][0]);
    } catch (error) {
      console.error(error);
    }
    return null;
  }
  public static async getRandom(): Promise<MealModel | null> {
    const url = 'http://www.themealdb.com/api/json/v1/1/random.php';
    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      let json = await response.json();

      return ConvertToModel(json['meals'][0]);
    } catch (error) {
      console.error(error);
    }
    return null;
  }
}

export default MealAPIFetch;
