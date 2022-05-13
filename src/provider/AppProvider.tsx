import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import React, {createContext, ReactNode, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {MealModel} from '../model/MealModel';
import firestore from '@react-native-firebase/firestore';
interface AppContextInterface {
  user: FirebaseAuthTypes.User | null;
  setUser: React.Dispatch<React.SetStateAction<FirebaseAuthTypes.User | null>>;
  SignIn: (
    email: string,
    password: string,
    // callBack: (user: FirebaseAuthTypes.User) => void,
    // callBackError: () => void,
  ) => Promise<string | null>;
  SignOut: () => void;
  SignUp: (email: string, password: string) => Promise<string | null>;
  userFav: Map<string, MealModel> | null;
  addUserFav: (data: MealModel) => void;
  addUserFavBatch: (batch: Map<string, MealModel>) => void;
  removeUserFav: (id: string, callBack: () => void) => void;
  removelAllFav: () => void;
  isFavorite: (id: string) => boolean;
  initUserData: boolean;
  setInit: () => void;
}

export const AppContext = createContext<AppContextInterface | null>(null);

type Props = {
  children: ReactNode;
};
export const AppProvider = ({children}: Props) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [init, setInit] = useState(false);
  const [userFav, setUserFav] = useState<Map<string, MealModel> | null>(null);
  const initAppContext: AppContextInterface = {
    user: user,
    initUserData: init,
    setUser: setUser,
    setInit() {
      setInit(true);
    },
    SignIn: async (email, password /* callBack, callBackError*/) => {
      try {
        await auth().signInWithEmailAndPassword(email, password);
        /*.then(data => {
            callBack(data.user);
          });*/
        //setInit(false)
        //setUserFav(null);
        return null;
      } catch (error) {
        //TODO handle error
        //callBackError();
        let authError = error as FirebaseAuthTypes.NativeFirebaseAuthError;
        return authError.message.replace(`[${authError.code}] `, '');
      }
    },
    SignOut: async () => {
      try {
        await auth().signOut();
      } catch (error) {
        //TODO handle error
        //console.log(error);
      }
    },
    SignUp: async (email: string, password: string) => {
      try {
        await auth()
          .createUserWithEmailAndPassword(email, password)
          .then(async data => {
            await firestore()
              .collection('Users')
              .doc(data.user.uid)
              .set({favList: Array<string>()});
          });
        return null;
      } catch (error) {
        //TODO handle error
        let authError = error as FirebaseAuthTypes.NativeFirebaseAuthError;
        return authError.message.replace(`[${authError.code}] `, '');
      }
    },
    userFav: userFav,
    addUserFavBatch(batch) {
      //setInit(true);
      setUserFav(batch);
    },
    addUserFav(data) {
      if (userFav) {
        if (userFav.get(data.idMeal!) === undefined) {
          let clone = new Map(userFav);
          clone.set(data.idMeal!, data);
          //Add to user
          const user = firestore().collection('Users').doc(this.user?.uid);
          user.get().then(async docs => {
            let sData = docs.data()!;
            await user.set({favList: [...sData['favList'], data.idMeal!]});
          });
          setUserFav(clone);
          //console.log('Add new');
        }
      } else {
        let temp = new Map<string, MealModel>();
        setUserFav(temp.set(data.idMeal!, data));
      }
    },
    removelAllFav() {
      setUserFav(null);
    },
    async removeUserFav(id, callBack) {
      let clone = new Map(userFav);
      clone.delete(id);
      const user = firestore().collection('Users').doc(this.user?.uid);
      let uDocs = await user.get();
      let sData = uDocs.data()!;
      let sList = sData['favList'] as Array<string>;
      let index = sList.indexOf(id);
      if (index > -1) {
        let nList = Array<string>();
        for (const it of sList) {
          if (it !== id) {
            nList.push(it);
          }
        }
        console.log(nList);
        await user.set({favList: nList});
      }

      callBack();

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
