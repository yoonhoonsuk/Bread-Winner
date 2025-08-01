import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import InputScreen from "../screens/InputScreen";
import MyHoldingsScreen from "../screens/MyHoldingsScreen";
import SearchTickerScreen from "../screens/SearchTickerScreen";

const Stack = createNativeStackNavigator();

export default function InputStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InputForm"
        component={InputScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyHoldings"
        component={MyHoldingsScreen}
        options={{ title: "My Holdings" }}
      />
      <Stack.Screen
        name="SearchTicker"
        component={SearchTickerScreen}
        options={{ title: "Search Ticker" }}
      />
    </Stack.Navigator>
  );
}
