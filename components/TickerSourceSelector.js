import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors, spacing } from "../constants/theme";

const SOURCES = [
  { label: "My Holdings", value: "holdings" },
  { label: "Search", value: "search" }
];

export default function TickerSourceSelector({ value, onChange }) {
  return (
    <View style={styles.row}>
      {SOURCES.map(option => {
        const selected = value === option.value;
        return (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.button,
              selected && styles.selected
            ]}
            onPress={() => onChange(option.value)}
            activeOpacity={0.85}
          >
            <Text style={[
              styles.text,
              selected && styles.selectedText
            ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: spacing.sm,
  },
  button: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 2
  },
  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  text: {
    color: colors.text,
    fontWeight: "500"
  },
  selectedText: {
    color: "#fff"
  }
});
