import { StyleSheet } from "react-native";
import { colors, spacing } from "../constants/theme";

export default StyleSheet.create({
    container: { flex: 1, padding: spacing.md, backgroundColor: colors.background },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 6,
      padding: spacing.sm,
      marginBottom: spacing.sm,
      backgroundColor: "#fff"
    },
    tickerItem: {
      padding: spacing.sm,
      marginBottom: spacing.xs,
      backgroundColor: "#fff",
      borderRadius: 6,
      borderWidth: 1,
      borderColor: colors.border
    },
    tickerText: { color: colors.text },
    noResults: {
      color: colors.muted,
      textAlign: "center",
      padding: spacing.sm
    }
  });