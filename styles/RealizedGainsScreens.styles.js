import { StyleSheet } from "react-native";
import { colors, spacing } from "../constants/theme";

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background
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
    left: { flex: 1, color: colors.text },
    middle: { flex: 2, textAlign: "center", color: colors.text },
    right: { flex: 1, textAlign: "right", fontWeight: "bold" }
  });