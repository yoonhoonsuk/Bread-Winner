import React from "react";
import { SafeAreaView, FlatList, View, Text, StyleSheet } from "react-native";
import { colors, spacing } from "../constants/theme";

// Example mock data
const mockHoldings = [
  { id: "1", ticker: "AAPL", name: "Apple Inc.", value: 5000000, gain: 12.5, currency: "USD" },
  { id: "2", ticker: "005930", name: "Samsung Electronics", value: 6000000, gain: -8.2, currency: "KRW" },
  { id: "3", ticker: "TSLA", name: "Tesla", value: 2500000, gain: 0, currency: "USD" }
];

export default function UnrealizedGainsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={mockHoldings}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.ticker}>{item.ticker} ({item.name})</Text>
            <Text style={styles.value}>
              {item.value.toLocaleString()} {item.currency}
            </Text>
            <Text
              style={[
                styles.gain,
                {
                  color:
                    item.gain > 0
                      ? colors.buy_gain
                      : item.gain < 0
                        ? colors.sell_loss
                        : colors.par
                }
              ]}
            >
              {item.gain > 0 ? "+" : ""}
              {item.gain}%
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: 36
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  ticker: {
    flex: 2,
    fontWeight: "bold",
    color: colors.text
  },
  value: {
    flex: 1,
    textAlign: "center"
  },
  gain: {
    flex: 1,
    textAlign: "right",
    fontWeight: "bold"
  }
});
