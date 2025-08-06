import React, { useState } from "react";
import { SafeAreaView, FlatList, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../constants/theme";
import { HEADER_TOP_MARGIN, TAB_BAR_FLOAT_MARGIN } from "../constants/dimensions";
import styles from "../styles/RealizedGainsScreens.styles";


const mockTrades = [
  { id: "1", ticker: "AAPL", date: "2024-07-15", gain: 100000, currency: "USD" },
  { id: "2", ticker: "TSLA", date: "2024-06-05", gain: -50000, currency: "USD" },
  { id: "3", ticker: "005930", date: "2024-05-01", gain: 0, currency: "KRW" }
];

export default function RealizedGainsScreen() {
  const insets = useSafeAreaInsets();
  const [filter] = useState("30d");
  const total = mockTrades.reduce((sum, t) => sum + t.gain, 0);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={mockTrades}
        keyExtractor={item => item.id}
        contentContainerStyle={[
          styles.listContent,
          {
            paddingTop: HEADER_TOP_MARGIN,
            paddingBottom: insets.bottom + TAB_BAR_FLOAT_MARGIN
          }
        ]}
        ListHeaderComponent={
          <Text style={styles.total}>
            Total Realized:{" "}
            <Text style={{
              color:
                total > 0 ? colors.buy_gain :
                total < 0 ? colors.sell_loss :
                colors.par,
              fontWeight: "bold"
            }}>
              {total.toLocaleString()}
            </Text>
            {" "} (all currencies)
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.left}>{item.ticker}</Text>
            <Text style={styles.middle}>{item.date}</Text>
            <Text
              style={[
                styles.right,
                {
                  color: item.gain > 0
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
