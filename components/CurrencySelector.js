// components/CurrencySelector.js

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, spacing } from "../constants/theme";

const currencyOptions = ["KRW", "USD", "EUR"];

export default function CurrencySelector({ value, onChange }) {
  return (
    <View style={styles.segmentedGroup}>
      {currencyOptions.map(option => (
        <TouchableOpacity
          key={option}
          style={[
            styles.segmentButton,
            value === option && styles.segmentButtonActive
          ]}
          onPress={() => onChange(option)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.segmentText,
              value === option && styles.segmentTextActive
            ]}
          >
            {option}
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
    borderColor: colors.primary,
    borderRadius: 6,
    backgroundColor: "#fff"
  },
  segmentButtonActive: {
    backgroundColor: colors.primary
  },
  segmentText: {
    color: colors.primary,
    fontWeight: "bold",
    textAlign: "center"
  },
  segmentTextActive: {
    color: "#fff"
  }
});
