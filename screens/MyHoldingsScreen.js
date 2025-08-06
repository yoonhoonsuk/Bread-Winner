import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HEADER_TOP_MARGIN, TAB_BAR_FLOAT_MARGIN } from "../constants/dimensions";
import styles from "../styles/MyHoldingsScreen.styles";

// Replace with actual user holdings or fetch from backend
const holdings = [
  { ticker: "AAPL", name: "Apple Inc." },
  { ticker: "005930", name: "Samsung Electronics" },
  { ticker: "TSLA", name: "Tesla" }
];

export default function MyHoldingsScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: HEADER_TOP_MARGIN,
          paddingBottom: insets.bottom + TAB_BAR_FLOAT_MARGIN,
        }
      ]}
    >
      {holdings.map(item => (
        <TouchableOpacity
          key={item.ticker}
          style={styles.tickerItem}
          onPress={() => {
            navigation.navigate({
              name: "InputForm",
              params: { ticker: item.ticker },
              merge: true
            });
          }}
        >
          <Text style={styles.tickerText}>{item.ticker} ({item.name})</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
