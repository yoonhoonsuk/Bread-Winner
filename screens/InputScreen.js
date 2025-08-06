import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { colors, spacing } from "../constants/theme";
import { HEADER_TOP_MARGIN, TAB_BAR_FLOAT_MARGIN } from "../constants/dimensions";
import styles from "../styles/InputScreen.styles";

const getToday = () => new Date().toISOString().slice(0, 10);
const getYesterday = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
};

const adjust = (value, delta, setter) => {
  const num = parseFloat(value) || 0;
  const next = Math.max(0, num + delta);
  setter(next.toString());
};

export default function InputScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();

  const [ticker, setTicker] = useState(route?.params?.ticker || "");
  const [tickerSource, setTickerSource] = useState(null);
  const [tradeType, setTradeType] = useState("buy");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("KRW");

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
    alert(`Trade: ${tradeType} ${quantity} ${ticker} at ${price} ${currency} on ${date}`);
  };

  const renderTickerSelector = () => {
    if (ticker) {
      return (
        <View style={styles.selectorPillRow}>
          <Text style={styles.selectorPillText}>{ticker}</Text>
          <Text
            style={styles.clearButton}
            onPress={() => {
              setTicker("");
              setTickerSource(null);
            }}
          >
            ✕
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.buttonRow}>
        {[
          { key: "holdings", label: "My Holdings" },
          { key: "search", label: "Search" }
        ].map((btn) => (
          <TouchableOpacity
            key={btn.key}
            style={[
              styles.sharedButton,
              tickerSource === btn.key && styles.sharedButtonActive,
            ]}
            onPress={() => {
              setTickerSource(btn.key);
              if (btn.key === "holdings") {
                navigation.navigate("MyHoldings", { currentTicker: ticker });
              } else if (btn.key === "search") {
                navigation.navigate("SearchTicker", { currentTicker: ticker });
              }
            }}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.sharedButtonText,
                tickerSource === btn.key && styles.sharedButtonTextActive,
              ]}
            >
              {btn.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderCurrencySelector = () => (
    <View style={styles.buttonRow}>
      {["KRW", "USD", "EUR"].map((cur) => (
        <TouchableOpacity
          key={cur}
          style={[styles.sharedButton, currency === cur && styles.sharedButtonActive]}
          onPress={() => setCurrency(cur)}
          activeOpacity={0.85}
        >
          <Text
            style={[
              styles.sharedButtonText,
              currency === cur && styles.sharedButtonTextActive,
            ]}
          >
            {cur}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderDateSelector = () => {
    if (dateMode === "custom" && customDate) {
      return (
        <View style={styles.selectorPillRow}>
          <Text style={styles.selectorPillText}>{customDate}</Text>
          <Text
            style={styles.clearButton}
            onPress={() => {
              setCustomDate("");
              setDateMode("today");
              setDate(getToday());
            }}
          >
            ✕
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.buttonRow}>
        {["today", "yesterday", "custom"].map((mode) => (
          <TouchableOpacity
            key={mode}
            style={[styles.sharedButton, dateMode === mode && styles.sharedButtonActive]}
            onPress={() => {
              if (mode === "today") {
                setDate(getToday());
                setDateMode("today");
                setCustomDate("");
              } else if (mode === "yesterday") {
                setDate(getYesterday());
                setDateMode("yesterday");
                setCustomDate("");
              } else {
                setShowPicker(true);
              }
            }}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.sharedButtonText,
                dateMode === mode && styles.sharedButtonTextActive,
              ]}
            >
              {mode === "today"
                ? "Today"
                : mode === "yesterday"
                ? "Yesterday"
                : "Custom"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderTradeTypeSelector = () => (
    <View style={styles.buttonRow}>
      {[
        { key: "buy", label: "Buy", color: colors.buy_gain },
        { key: "sell", label: "Sell", color: colors.sell_loss }
      ].map(({ key, label, color }) => {
        const isActive = tradeType === key;
        return (
          <TouchableOpacity
            key={key}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: color,
              borderRadius: 6,
              backgroundColor: isActive ? color : "#fff",
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 4,
            }}
            onPress={() => setTradeType(key)}
            activeOpacity={0.85}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: 14,
                color: isActive ? "#fff" : color,
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: HEADER_TOP_MARGIN,
            paddingBottom: insets.bottom + TAB_BAR_FLOAT_MARGIN
          }
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.label}>Ticker</Text>
        {renderTickerSelector()}

        <Text style={styles.label}>Trade Type</Text>
        {renderTradeTypeSelector()}

        <Text style={styles.label}>Quantity</Text>
        <View style={styles.steppedInputRow}>
          <TextInput
            style={styles.steppedInput}
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            placeholder="0"
          />
          <TouchableOpacity
            style={styles.stepperBtn}
            onPress={() => adjust(quantity, -1, setQuantity)}
          >
            <Text style={styles.stepperText}>–</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.stepperBtn}
            onPress={() => adjust(quantity, +1, setQuantity)}
          >
            <Text style={styles.stepperText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Price</Text>
        <View style={styles.steppedInputRow}>
          <TextInput
            style={styles.steppedInput}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            placeholder="0"
          />
          <TouchableOpacity
            style={styles.stepperBtn}
            onPress={() => adjust(price, -1, setPrice)}
          >
            <Text style={styles.stepperText}>–</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.stepperBtn}
            onPress={() => adjust(price, +1, setPrice)}
          >
            <Text style={styles.stepperText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Currency</Text>
        {renderCurrencySelector()}

        <Text style={styles.label}>Date</Text>
        {renderDateSelector()}

        <TouchableOpacity
          style={[styles.sharedButton, styles.sharedButtonActive, { marginTop: spacing.md }]}
          onPress={handleSubmit}
          activeOpacity={0.85}
        >
          <Text style={styles.sharedButtonTextActive}>Add Trade</Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={showPicker}
          mode="date"
          date={customDate ? new Date(customDate) : new Date()}
          onConfirm={(pickedDate) => {
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
