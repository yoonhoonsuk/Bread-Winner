import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, spacing } from "../constants/theme";

// Replace with real user's holdings from state or backend
const holdings = [
  { ticker: "AAPL", name: "Apple Inc." },
  { ticker: "005930", name: "Samsung Electronics" },
  { ticker: "TSLA", name: "Tesla" }
];

export default function MyHoldingsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {holdings.map(item => (
        <TouchableOpacity
          key={item.ticker}
          style={styles.tickerItem}
          onPress={() => {
            // Send ticker back to the form
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

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md, backgroundColor: colors.background },
  tickerItem: {
    padding: spacing.sm,
    marginBottom: spacing.xs,
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border
  },
  tickerText: { color: colors.text }
});
