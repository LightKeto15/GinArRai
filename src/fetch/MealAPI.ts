import axios, {AxiosError} from 'axios';
import {ConvertToModel, MealModel} from '../model/MealModel';

class MealAPI {
  static TIMEOUT = 5000;

  private static async makeRequest(url: string): Promise<MealModel | null> {
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
      return {error: err.message} as MealModel;
    }
  }

  public static async getById(id: string): Promise<MealModel | null> {
    console.log(id);
    const url = `http://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    return this.makeRequest(url);
  }

  public static async getRandom(): Promise<MealModel | null> {
    const url = 'http://www.themealdb.com/api/json/v1/1/random.php';
    return this.makeRequest(url);
  }

  public static async batchRequest(ids: string[]): Promise<Array<MealModel> | null> {

    let nList = Array<MealModel>();
    await Promise.all(
      ids.map(async id => {
        const fData = await this.getById(id);
        nList.push(fData as MealModel);
      }),
    );
    return nList;
  }
}

export default MealAPI;
