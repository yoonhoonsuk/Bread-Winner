import React, { useState } from "react";
import { SafeAreaView, FlatList, View, Text, StyleSheet } from "react-native";
import { colors, spacing } from "../constants/theme";

const mockTrades = [
  { id: "1", ticker: "AAPL", date: "2024-07-15", gain: 100000, currency: "USD" },
  { id: "2", ticker: "TSLA", date: "2024-06-05", gain: -50000, currency: "USD" },
  { id: "3", ticker: "005930", date: "2024-05-01", gain: 0, currency: "KRW" }
];

export default function RealizedGainsScreen() {
  const [filter] = useState("30d");
  const total = mockTrades.reduce((sum, t) => sum + t.gain, 0);

  return (
    <SafeAreaView style={styles.container}>
      {/* If you want filters, add here */}
      <Text style={styles.total}>
        Total Realized: <Text style={{
          color:
            total > 0 ? colors.buy_gain :
            total < 0 ? colors.sell_loss :
            colors.par,
          fontWeight: "bold"
        }}>{total.toLocaleString()}</Text> (all currencies)
      </Text>
      <FlatList
        data={mockTrades}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.left}>{item.ticker}</Text>
            <Text style={styles.middle}>{item.date}</Text>
            <Text
              style={[
                styles.right,
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
              {item.gain.toLocaleString()} {item.currency}
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
  total: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: spacing.sm,
    textAlign: "center"
  },
  listContent: {
    paddingHorizontal: spacing.md,
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
  left: { flex: 1, color: colors.text },
  middle: { flex: 2, textAlign: "center", color: colors.text },
  right: { flex: 1, textAlign: "right", fontWeight: "bold" }
});
