import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MealAPI from '../fetch/MealAPI';
import {MealModel} from '../model/MealModel';
import {AppContext} from '../provider/AppProvider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
function Meal() {
  const [fetchData, setFetchData] = useState(false);
  const [fav, setFav] = useState(false);
  const [data, setData] = useState<MealModel | null>(null);
  const appContext = useContext(AppContext);
  useEffect(() => {
    MealAPI().then(data => {
      setData(data);
      setFav(false);
    });
  }, [fetchData]);
  if (!data) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Search new meal</Text>
        <ActivityIndicator style={{marginLeft: 30}} />
      </View>
    );
  }
  const onAgain = () => {
    setData(null);
    setFetchData(!fetchData);
  };

  const onFavorite = () => {
    if (fav) {
      setFav(false);
      appContext?.removeUserFav(data.idMeal!);
    } else {
      setFav(true);
      appContext?.addUserFav(data);
    }
  };

  const getTagView = () => {
    return;
    <Text>{data!.strTags}</Text>;
  };
  //
  //{data!.strTags ? getTagView() : null}
  //
  const getIngredient = () => {
    return (
      <View>
        <Text>
          {data!.strIngredient1
            ? `${data!.strIngredient1} : ${data!.strMeasure1}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient2
            ? `${data!.strIngredient2} : ${data!.strMeasure2}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient3
            ? `${data!.strIngredient3} : ${data!.strMeasure3}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient4
            ? `${data!.strIngredient4} : ${data!.strMeasure4}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient5
            ? `${data!.strIngredient5} : ${data!.strMeasure5}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient6
            ? `${data!.strIngredient6} : ${data!.strMeasure6}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient7
            ? `${data!.strIngredient7} : ${data!.strMeasure7}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient8
            ? `${data!.strIngredient8} : ${data!.strMeasure8}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient9
            ? `${data!.strIngredient9} : ${data!.strMeasure9}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient10
            ? `${data!.strIngredient10} : ${data!.strMeasure10}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient11
            ? `${data!.strIngredient11} : ${data!.strMeasure11}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient12
            ? `${data!.strIngredient12} : ${data!.strMeasure12}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient13
            ? `${data!.strIngredient13} : ${data!.strMeasure13}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient14
            ? `${data!.strIngredient14} : ${data!.strMeasure14}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient15
            ? `${data!.strIngredient15} : ${data!.strMeasure15}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient16
            ? `${data!.strIngredient16} : ${data!.strMeasure16}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient17
            ? `${data!.strIngredient17} : ${data!.strMeasure17}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient18
            ? `${data!.strIngredient18} : ${data!.strMeasure18}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient19
            ? `${data!.strIngredient19} : ${data!.strMeasure19}`
            : null}
        </Text>
        <Text>
          {data!.strIngredient20
            ? `${data!.strIngredient20} : ${data!.strMeasure20}`
            : null}
        </Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View
        style={{
          flex: 1,
          flexGrow: 1,
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 25}}>{`${data!.strMeal} (${
            data!.strCategory
          })`}</Text>
          {data!.strSource ? (
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() => Linking.openURL(data!.strSource!)}>
              <MaterialIcons name="info" size={30} color="#000000" />
            </TouchableOpacity>
          ) : null}
        </View>

        <ScrollView>
          <View style={{alignItems: 'center'}}>
            <Image
              style={{
                width: 200,
                height: 200,
                resizeMode: 'stretch',
              }}
              source={{uri: data!.strMealThumb!}}></Image>
          </View>
          {data!.strArea ? <Text>{data!.strArea}</Text> : null}
          <Text>{data!.strTags}</Text>
          <View
            style={{flexDirection: 'column', borderRadius: 5, borderWidth: 2}}>
            <Text>Instructions</Text>
            <Text>{data!.strInstructions}</Text>
            <Text>Ingredient</Text>
            {getIngredient()}
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          height: '15%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{width: '100%', height: 0.5, backgroundColor: 'gray'}} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity style={{marginLeft: '2%'}} onPress={onAgain}>
            <Text>Again</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: '2%'}} onPress={onFavorite}>
            <MaterialIcons
              name={fav ? 'favorite' : 'favorite-border'}
              size={30}
              color="#000000"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Meal;
