import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LogIn from "./src/Screens/LogIn";
import Register from "./src/Screens/Register";
import Home from "./src/Screens/HomeScreen";
import Verification from "./src/Screens/Verification";
import ArrangeDelivery from "./src/Screens/ArrangeDelivey";
import Account from "./src/Screens/Account";
import ProfileScreen from "./src/Screens/Account/screens/ProfileScreen";
import AddressScreen from "./src/Screens/Account/screens/SavedAddress";
import LanguageScreen from "./src/Screens/Account/screens/LanguageScreen";
import ContactScreen from "./src/Screens/Account/screens/ContactScreen";
import T_C_Screen from "./src/Screens/Account/screens/T&C_screen";
import MyMap from "./src/Screens/ArrangeDelivey/Confirm/Map";
import RateCalculator from "./src/Screens/Account/screens/RateCalculatorScreen";
import MyDeliveries from "./src/Screens/MyDelivery";
import OrderDetailsScreen from "./src/Screens/MyDelivery/component/OrderDetailsScreen";
import SplashScreen from "./src/Screens/SplashScreen";
import ChooseCustomer from "./src/Screens/ChooseCustomer";
import PaymentMethods from "./src/Screens/ArrangeDelivey/Payment/PaymentMethods";
import PaymentScreen from "./src/Screens/ArrangeDelivey/Payment/PaymentScreen";


export default function App(){

  const Stack = createNativeStackNavigator();
  const [token, setToken] = useState(null);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(()=>{
    isUser();
    setTimeout(()=>{
      setAppIsReady(true);
    },3500)
  },[]);

  const isUser = async() => {
      try {
        let userData = await AsyncStorage.getItem('jwt');
        let data = JSON.parse(userData);
        if(data !== null){
          setToken(data);
        }else{
          setToken(null);
        }
      } catch(e) {
        console.log("Error while accessing token: ",e);
      }
  };

  if(!appIsReady){
    return <SplashScreen />
  };

  return (
    <NavigationContainer>
      <View style={{flex:1,backgroundColor:"#e0ab24"}}>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={token ? "HomeScreen" : "Login"}>
          <Stack.Screen name="Login" component={LogIn} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="HomeScreen" component={Home} />
          <Stack.Screen name="verification" component={Verification} />
          <Stack.Screen name="ArrangeDelivery" component={ArrangeDelivery} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Adresses" component={AddressScreen} />
          <Stack.Screen name="Language" component={LanguageScreen} />
          <Stack.Screen name="Contact" component={ContactScreen} />
          <Stack.Screen name="Terms" component={T_C_Screen} />
          <Stack.Screen name="myDeliveries" component={MyDeliveries} />
          <Stack.Screen name="PaymentMethod" component={PaymentMethods} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
          <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
          <Stack.Screen name="Map" component={MyMap} />
          {/* <Stack.Screen name="Pickup Assigned" component={PickupAssigned} /> */}
          <Stack.Screen name="RateCalculator" component={RateCalculator} />
          <Stack.Screen name="ChooseCustomer" component={ChooseCustomer} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};
