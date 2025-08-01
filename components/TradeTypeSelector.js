// components/TradeTypeSelector.js

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, spacing } from "../constants/theme";

const tradeTypes = [
  { label: "Buy", value: "buy", color: colors.danger },    // Red
  { label: "Sell", value: "sell", color: colors.primary }   // Blue
];

export default function TradeTypeSelector({ value, onChange }) {
  return (
    <View style={styles.segmentedGroup}>
      {tradeTypes.map(type => (
        <TouchableOpacity
          key={type.value}
          style={[
            styles.segmentButton,
            value === type.value && { backgroundColor: type.color, borderColor: type.color }
          ]}
          onPress={() => onChange(type.value)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.segmentText,
              value === type.value && { color: "#fff" }
            ]}
          >
            {type.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  segmentedGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm
  },
  segmentButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    backgroundColor: "#fff"
  },
  segmentText: {
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center"
  }
});
