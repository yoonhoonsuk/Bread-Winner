import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors, spacing } from "../constants/theme";

const tradeTypes = [
  { label: "Buy", value: "buy", color: colors.buy_gain },
  { label: "Sell", value: "sell", color: colors.sell_loss }
];

export default function TradeTypeSelector({ value, onChange }) {
  return (
    <View style={styles.segmentedGroup}>
      {tradeTypes.map(type => {
        const selected = value === type.value;
        return (
          <TouchableOpacity
            key={type.value}
            style={[
              styles.button,
              selected && {
                backgroundColor: type.color,
                borderColor: type.color
              }
            ]}
            onPress={() => onChange(type.value)}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.text,
                selected
                  ? { color: "#fff", fontWeight: "600" }
                  : { color: colors.text, fontWeight: "400" }
              ]}
            >
              {type.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  segmentedGroup: {
    flexDirection: "row",
    marginBottom: spacing.sm
  },
  button: {
    flex: 1,
    paddingVertical: spacing.sm,
    marginHorizontal: 2,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 6,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 16,
    fontWeight: "400"
  }
});
