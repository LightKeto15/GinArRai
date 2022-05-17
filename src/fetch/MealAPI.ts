import axios, {AxiosError} from 'axios';
import {ConvertToModel, MealModel} from '../model/MealModel';

class MealAPI {
  static TIMEOUT = 5000;

  private static async makeRequest(
    url: string,
  ): Promise<MealModel | null | string> {
    try {
      let response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: this.TIMEOUT,
      });
      return ConvertToModel(response.data['meals'][0]);
    } catch (error) {
      let err = error as AxiosError;
      console.error(err);
      return `${err.message}`;
    }
  }

  public static async getById(id: string): Promise<MealModel | null | string> {
    console.log(id);
    const url = `http://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    return this.makeRequest(url);
  }

  public static async getRandom(): Promise<MealModel | null | string> {
    const url = 'test12345'; //'http://www.themealdb.com/api/json/v1/1/random.php';
    return this.makeRequest(url);
  }
}

export default MealAPI;
