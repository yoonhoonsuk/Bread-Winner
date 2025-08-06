import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../constants/theme";
import {
  ICON_SIZE,
  TAB_BAR_HEIGHT,
  TAB_BAR_FLOAT_MARGIN,
  TAB_BAR_BORDER_WIDTH
} from "../constants/dimensions";
import InputStackNavigator from "../navigation/InputStackNavigator";
import RealizedGainsScreen from "../screens/RealizedGainsScreen";
import UnrealizedGainsScreen from "../screens/UnrealizedGainsScreen";
import FlourIcon from "../assets/flour.png";
import DoughIcon from "../assets/dough.png";
import BreadIcon from "../assets/bread.png";

const TAB_ICONS = {
  Input: FlourIcon,
  "Unrealized Gains": DoughIcon,
  "Realized Gains": BreadIcon
};

const Tab = createBottomTabNavigator();

function getTabBarIcon(routeName) {
  return ({ color, focused }) => (
    <Image
      source={TAB_ICONS[routeName]}
      style={{
        width: ICON_SIZE,
        height: ICON_SIZE,
        alignSelf: "center",
        opacity: focused ? 1 : 0.72,
        marginTop: 2, // Instagram usually slightly lifts the icons up
      }}
      resizeMode="contain"
    />
  );
}

export default function BottomTabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: getTabBarIcon(route.name),
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.border,
          borderTopWidth: TAB_BAR_BORDER_WIDTH,
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.09,
          shadowRadius: 6,
          height: TAB_BAR_HEIGHT + insets.bottom + TAB_BAR_FLOAT_MARGIN, // Total height (tab bar + float + safe)
          paddingTop: 8,      // Instagram has a bit of top padding
          paddingBottom: insets.bottom + TAB_BAR_FLOAT_MARGIN, // always float + safe area
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Input" component={InputStackNavigator} />
      <Tab.Screen name="Unrealized Gains" component={UnrealizedGainsScreen} />
      <Tab.Screen name="Realized Gains" component={RealizedGainsScreen} />
    </Tab.Navigator>
  );
}
