import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, TextInput, StyleSheet, Button } from "react-native";
import TickerSourceSelector from "../components/TickerSourceSelector";
import TradeTypeSelector from "../components/TradeTypeSelector";
import CurrencySelector from "../components/CurrencySelector";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { colors, spacing } from "../constants/theme";

// Helper functions for today/yesterday
const getToday = () => {
  const d = new Date();
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
};

const getYesterday = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
};

export default function InputScreen({ navigation, route }) {
  const [ticker, setTicker] = useState(route?.params?.ticker || "");
  const [tickerSource, setTickerSource] = useState(null);
  const [tradeType, setTradeType] = useState("buy");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("KRW");
  const [date, setDate] = useState(getToday());
  const [showPicker, setShowPicker] = useState(false);
  const [dateMode, setDateMode] = useState("today"); // "today" | "yesterday" | "custom"

  useEffect(() => {
    if (route?.params?.ticker && route.params.ticker !== ticker) {
      setTicker(route.params.ticker);
      setTickerSource(null); // Hide selector when ticker chosen
    }
  }, [route?.params?.ticker]);

  const handleSubmit = () => {
    alert(
      `Trade: ${tradeType} ${quantity} ${ticker} at ${price} ${currency} on ${date}`
    );
  };

  const handleTickerSource = (src) => {
    setTickerSource(src);
    if (src === "holdings") {
      navigation.navigate("MyHoldings", { currentTicker: ticker });
    } else if (src === "search") {
      navigation.navigate("SearchTicker", { currentTicker: ticker });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>Ticker</Text>
        {ticker ? (
          <View style={styles.tickerSelectedRow}>
            <Text style={styles.tickerSelectedText}>{ticker}</Text>
            <Text style={styles.clearButton} onPress={() => {
              setTicker("");
              setTickerSource(null);
            }}>✕</Text>
          </View>
        ) : (
          <TickerSourceSelector value={tickerSource} onChange={handleTickerSource} />
        )}

        <Text style={styles.label}>Trade Type</Text>
        <TradeTypeSelector value={tradeType} onChange={setTradeType} />

        <Text style={styles.label}>Quantity</Text>
        <TextInput
          style={styles.input}
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          placeholder="e.g. 10"
        />

        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          placeholder="e.g. 50000"
        />

        <Text style={styles.label}>Currency</Text>
        <CurrencySelector value={currency} onChange={setCurrency} />

        <Text style={styles.label}>Date</Text>
        <View style={styles.dateRow}>
          <Text
            style={[
              styles.dateButton,
              dateMode === "today" && styles.dateButtonActive
            ]}
            onPress={() => {
              setDate(getToday());
              setDateMode("today");
            }}
          >
            Today
          </Text>
          <Text
            style={[
              styles.dateButton,
              dateMode === "yesterday" && styles.dateButtonActive
            ]}
            onPress={() => {
              setDate(getYesterday());
              setDateMode("yesterday");
            }}
          >
            Yesterday
          </Text>
        </View>
        <View style={{ marginBottom: spacing.sm }}>
          <Text
            style={[
              styles.dateButton,
              dateMode === "custom" && styles.dateButtonActive
            ]}
            onPress={() => {
              setShowPicker(true);
              setDateMode("custom");
            }}
          >
            Custom
          </Text>
        </View>
        <Text style={styles.selectedDate}>Selected: {date}</Text>

        {/* Add Trade Button */}
        <View style={{ marginTop: spacing.md }}>
          <Button title="Add Trade" onPress={handleSubmit} color={colors.primary} />
        </View>

        {/* Date Picker Modal */}
        <DateTimePickerModal
          isVisible={showPicker}
          mode="date"
          date={new Date(date)}
          onConfirm={pickedDate => {
            const d = new Date(pickedDate);
            setDate(d.toISOString().slice(0, 10));
            setShowPicker(false);
            setDateMode("custom");
          }}
          onCancel={() => setShowPicker(false)}
          maximumDate={new Date()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 80
  },
  label: {
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
    fontWeight: "bold",
    color: colors.text
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    backgroundColor: "#fff"
  },
  tickerSelectedRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: 6,
    minHeight: 44,
    paddingHorizontal: spacing.md,
  },
  tickerSelectedText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
    flex: 1,
  },
  clearButton: {
    marginLeft: spacing.sm,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 4,
    paddingHorizontal: 8,
    textAlign: "right"
  },
  dateRow: {
    flexDirection: "row",
    marginBottom: spacing.xs,
  },
  dateButton: {
    flex: 1,
    backgroundColor: "#eee",
    color: colors.text,
    paddingVertical: 10,
    textAlign: "center",
    borderRadius: 6,
    marginRight: spacing.xs,
    fontWeight: "500"
  },
  dateButtonActive: {
    backgroundColor: colors.primary,
    color: "#fff"
  },
  selectedDate: {
    marginBottom: spacing.sm,
    textAlign: "center",
    color: colors.text,
    fontWeight: "600"
  }
});
