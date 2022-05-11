import {MealModel} from '../model/MealModel';

export default async function MealAPI() {
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

    return json['meals'][0];
  } catch (error) {
    console.error(error);
  }
  return null;
}
