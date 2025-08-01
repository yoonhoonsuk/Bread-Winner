import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { colors } from "../constants/theme";
import InputStackNavigator from "../navigation/InputStackNavigator";
import RealizedGainsScreen from "../screens/RealizedGainsScreen";
import UnrealizedGainsScreen from "../screens/UnrealizedGainsScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.border,
          borderTopWidth: 2,
          elevation: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.08,
          shadowRadius: 6
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: {
          fontWeight: "bold",
          fontSize: 14
        }
      }}
    >
      <Tab.Screen name="Unrealized Gains" component={UnrealizedGainsScreen} />
      <Tab.Screen name="Realized Gains" component={RealizedGainsScreen} />
      <Tab.Screen name="Input" component={InputStackNavigator} />
    </Tab.Navigator>
  );
}
