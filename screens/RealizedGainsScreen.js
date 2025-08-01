import React, { useState } from "react";
import { Button, FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../constants/theme";

const mockTrades = [
  { id: "1", ticker: "AAPL", date: "2024-07-15", gain: 100000, currency: "USD" },
  { id: "2", ticker: "TSLA", date: "2024-06-05", gain: -50000, currency: "USD" },
  { id: "3", ticker: "005930", date: "2024-05-01", gain: 200000, currency: "KRW" }
];

export default function RealizedGainsScreen() {
  const [filter, setFilter] = useState("30d");
  const total = mockTrades.reduce((sum, t) => sum + t.gain, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterRow}>
        <Button title="Last 30d" onPress={() => setFilter("30d")} color={filter === "30d" ? colors.primary : colors.muted} />
        <Button title="Last 2w" onPress={() => setFilter("2w")} color={filter === "2w" ? colors.primary : colors.muted} />
        <Button title="Custom" onPress={() => setFilter("custom")} color={filter === "custom" ? colors.primary : colors.muted} />
      </View>
      <Text style={styles.total}>
        Total Realized: {total.toLocaleString()} (all currencies)
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
                { color: item.gain >= 0 ? colors.success : colors.danger }
              ]}
            >
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
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: spacing.md,
    marginTop: spacing.md
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
  left: { flex: 1 },
  middle: { flex: 2, textAlign: "center" },
  right: { flex: 1, textAlign: "right", fontWeight: "bold" }
});
