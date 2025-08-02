import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import TickerSourceSelector from "../components/TickerSourceSelector";
import TradeTypeSelector from "../components/TradeTypeSelector";
import CurrencySelector from "../components/CurrencySelector";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { colors, spacing } from "../constants/theme";
import { ROW_HEIGHT, BORDER_RADIUS, BORDER_WIDTH } from "../constants/dimensions";

// Helper functions
const getToday = () => {
  const d = new Date();
  return d.toISOString().slice(0, 10);
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

  // Date controls
  const [date, setDate] = useState(getToday());
  const [dateMode, setDateMode] = useState("today");
  const [showPicker, setShowPicker] = useState(false);
  const [customDate, setCustomDate] = useState("");

  useEffect(() => {
    if (route?.params?.ticker && route.params.ticker !== ticker) {
      setTicker(route.params.ticker);
      setTickerSource(null);
    }
  }, [route?.params?.ticker]);

  useEffect(() => {
    if (customDate) {
      setDate(customDate);
      setDateMode("custom");
    }
  }, [customDate]);

  const handleSubmit = () => {
    alert(
      `Trade: ${tradeType} ${quantity} ${ticker} at ${price} ${currency} on ${date}`
    );
  };

  function renderDateSelector() {
    if (dateMode === "custom" && customDate) {
      // Custom date pill
      return (
        <View style={styles.selectorPillRow}>
          <Text style={styles.selectorPillText}>{customDate}</Text>
          <Text style={styles.clearButton} onPress={() => {
            setCustomDate("");
            setDateMode(null);
            setDate(getToday());
          }}>✕</Text>
        </View>
      );
    }
    // Otherwise, normal horizontal segmented control
    return (
      <View style={styles.segmentedRow}>
        {["today", "yesterday", "custom"].map((mode, idx) => (
          <TouchableOpacity
            key={mode}
            style={[
              styles.segmentedButton,
              dateMode === mode && styles.segmentedButtonActive,
              idx === 0 && styles.segmentedButtonLeft,
              idx === 2 && styles.segmentedButtonRight,
            ]}
            onPress={() => {
              if (mode === "today") {
                setDate(getToday());
                setDateMode("today");
                setCustomDate("");
              } else if (mode === "yesterday") {
                setDate(getYesterday());
                setDateMode("yesterday");
                setCustomDate("");
              } else if (mode === "custom") {
                setShowPicker(true);
              }
            }}
            activeOpacity={0.85}
          >
            <Text style={[
              styles.segmentedButtonText,
              dateMode === mode && styles.segmentedButtonTextActive,
            ]}>
              {mode === "today" ? "Today" : mode === "yesterday" ? "Yesterday" : "Custom"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  function renderTickerSelector() {
    if (ticker) {
      return (
        <View style={styles.selectorPillRow}>
          <Text style={styles.selectorPillText}>{ticker}</Text>
          <Text style={styles.clearButton} onPress={() => {
            setTicker("");
            setTickerSource(null);
          }}>✕</Text>
        </View>
      );
    }
    // Use TickerSourceSelector, which should also use this segmentedRow style and constants
    return (
      <TickerSourceSelector value={tickerSource} onChange={(src) => {
        setTickerSource(src);
        if (src === "holdings") {
          navigation.navigate("MyHoldings", { currentTicker: ticker });
        } else if (src === "search") {
          navigation.navigate("SearchTicker", { currentTicker: ticker });
        }
      }} />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>Ticker</Text>
        {renderTickerSelector()}

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
        {renderDateSelector()}

        {/* Add Trade Button */}
        <TouchableOpacity style={styles.fullWidthButton} onPress={handleSubmit} activeOpacity={0.85}>
          <Text style={styles.fullWidthButtonText}>Add Trade</Text>
        </TouchableOpacity>

        {/* Date Picker Modal */}
        <DateTimePickerModal
          isVisible={showPicker}
          mode="date"
          date={customDate ? new Date(customDate) : new Date()}
          onConfirm={pickedDate => {
            const d = new Date(pickedDate);
            setCustomDate(d.toISOString().slice(0, 10));
            setShowPicker(false);
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
    borderWidth: BORDER_WIDTH,
    borderColor: colors.border,
    borderRadius: BORDER_RADIUS,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    backgroundColor: "#fff"
  },
  segmentedRow: {
    flexDirection: "row",
    alignItems: "center",
    height: ROW_HEIGHT,
    borderRadius: BORDER_RADIUS,
    borderWidth: BORDER_WIDTH,
    borderColor: colors.primary,
    marginBottom: spacing.sm,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  segmentedButton: {
    flex: 1,
    height: ROW_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  segmentedButtonActive: {
    backgroundColor: colors.primary,
  },
  segmentedButtonLeft: {
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
  },
  segmentedButtonRight: {
    borderTopRightRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  segmentedButtonText: {
    color: colors.text,
    fontWeight: "500",
    fontSize: 16,
  },
  segmentedButtonTextActive: {
    color: "#fff",
  },
  // "Pill" row for selected ticker or custom date
  selectorPillRow: {
    flexDirection: "row",
    alignItems: "center",
    height: ROW_HEIGHT,
    borderRadius: BORDER_RADIUS,
    marginBottom: spacing.sm,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    width: "100%"
  },
  selectorPillText: {
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
  fullWidthButton: {
    backgroundColor: colors.primary,
    borderRadius: BORDER_RADIUS,
    height: ROW_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.md,
    width: "100%",
    borderWidth: BORDER_WIDTH,
    borderColor: colors.primary,
    marginBottom: spacing.md
  },
  fullWidthButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 0.5
  }
});
