import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import Favorite from '../screens/Favorite';
import Home from '../screens/Home';
import Meal from '../screens/Meal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Text, View} from 'react-native';
import {AppContext} from '../provider/AppProvider';
import {MealModel} from '../model/MealModel';
import Instruction from '../screens/Instruction';
export type AppRootStackParamList = {
  Home: undefined;
  Meal: undefined;
  Instruction: {mealData: MealModel};
};
export type AppFavRootStackParamList = {
  Favorite: undefined;
  InstructionFav: {mealData: MealModel};
};

export type AppDrawerParamList = {HomeDrawer: undefined; FavDrawer: undefined};

const AppNavStack = createNativeStackNavigator<AppRootStackParamList>();
const AppFavNavStack = createNativeStackNavigator<AppFavRootStackParamList>();
const Drawer = createDrawerNavigator<AppDrawerParamList>();
export default function AppStack() {
  const AppView = () => {
    return (
      <AppNavStack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <AppNavStack.Screen name="Home" component={Home} />
        <AppNavStack.Screen name="Meal" component={Meal} />
        <AppNavStack.Screen
          name="Instruction"
          component={Instruction}
          options={{animation: 'none'}}
        />
      </AppNavStack.Navigator>
    );
  };
  const FavView = () => {
    return (
      <AppFavNavStack.Navigator
        initialRouteName="Favorite"
        screenOptions={{headerShown: false}}>
        <AppFavNavStack.Screen name="Favorite" component={Favorite} />
        <AppFavNavStack.Screen
          name="InstructionFav"
          component={Instruction}
          options={{animation: 'none'}}
        />
      </AppFavNavStack.Navigator>
    );
  };
  const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const appContext = useContext(AppContext);
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            height: '10%',
            backgroundColor: '#e76f51',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Text style={{fontSize: 18, color: 'white', marginLeft: '5%'}}>
            {appContext?.user!.email}
          </Text>
        </View>
        <DrawerContentScrollView style={{flex: 1}} {...props}>
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Sign Out"
              icon={({focused, color, size}) => {
                return (
                  <MaterialIcons color={color} size={size} name="logout" />
                );
              }}
              onPress={() => appContext?.SignOut()}
            />
          </View>
        </DrawerContentScrollView>
      </View>
    );
  };
  return (
    <Drawer.Navigator
      initialRouteName="HomeDrawer"
      drawerContent={CustomDrawerContent}>
      <Drawer.Screen
        name="HomeDrawer"
        component={AppView}
        options={{
          drawerLabel: 'Home',
          drawerLabelStyle: {color: '#1c1c1ead'},
          drawerActiveBackgroundColor: '#f4a261',
          drawerIcon: ({focused, size}) => (
            <MaterialIcons
              name="home"
              size={size}
              color={focused ? '#e76f51' : '#1c1c1ead'}
            />
          ),
          title: '',
          headerTransparent: true,
        }}
      />
      <Drawer.Screen
        name="FavDrawer"
        component={FavView}
        options={{
          drawerLabel: 'Favorite',
          drawerLabelStyle: {color: '#1c1c1ead'},
          drawerActiveBackgroundColor: '#f4a261',
          drawerIcon: ({focused, size}) => (
            <MaterialIcons
              name="favorite"
              size={size}
              color={focused ? '#e76f51' : '#1c1c1ead'}
            />
          ),
          title: 'Favorite',
        }}
      />
    </Drawer.Navigator>
  );
}
