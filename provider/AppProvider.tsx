import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import React, {createContext, ReactNode, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {MealModel} from '../model/MealModel';
interface AppContextInterface {
  user: FirebaseAuthTypes.User | null;
  setUser: React.Dispatch<React.SetStateAction<FirebaseAuthTypes.User | null>>;
  SignIn: (email: string, password: string) => void;
  SignOut: () => void;
  SignUp: (email: string, password: string) => void;
  userFav: Map<string, MealModel> | null;
  addUserFav: (data: MealModel) => void;
  removeUserFav: (id: string) => void;
  isFavorite: (id: string) => boolean;
  error: string;
  setError: string;
}

export const AppContext = createContext<AppContextInterface | null>(null);

type Props = {
  children: ReactNode;
};
export const AppProvider = ({children}: Props) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [error, setError] = useState('');
  const [userFav, setUserFav] = useState<Map<string, MealModel> | null>(null);
  const initAppContext: AppContextInterface = {
    user: user,
    error: error,
    setUser: setUser,
    setError: '',
    SignIn: async (email: string, password: string) => {
      try {
        await auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        //TODO handle error
        console.log(error);
      }
    },
    SignOut: async () => {
      try {
        await auth().signOut();
      } catch (error) {
        //TODO handle error
        console.log(error);
      }
    },
    SignUp: async (email: string, password: string) => {
      try {
        await auth().createUserWithEmailAndPassword(email, password);
      } catch (error) {
        //TODO handle error
        console.log(error);
      }
    },
    userFav: userFav,
    addUserFav(data) {
      if (userFav) {
        if (userFav.get(data.idMeal!) === undefined) {
          setUserFav(userFav.set(data.idMeal!, data));
          //console.log('Add new');
        }
      } else {
        let temp = new Map<string, MealModel>();
        setUserFav(temp.set(data.idMeal!, data));
      }
    },
    removeUserFav(id) {
      let clone = new Map(userFav);
      clone.delete(id);
      setUserFav(clone);
    },
    isFavorite(id) {
      if (userFav) {
        if (id in userFav) return true;
        else return false;
      }
      return false;
    },
  };
  return (
    <AppContext.Provider value={initAppContext}>{children}</AppContext.Provider>
  );
};
