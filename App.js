import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/BottomTabNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
