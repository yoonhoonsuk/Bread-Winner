import { StyleSheet } from "react-native";
import { colors, spacing } from "../constants/theme";

export default StyleSheet.create({
    container: { flex: 1, padding: spacing.md, backgroundColor: colors.background },
    tickerItem: {
        padding: spacing.sm,
        marginBottom: spacing.xs,
        backgroundColor: "#fff",
        borderRadius: 6,
        borderWidth: 1,
        borderColor: colors.border
    },
    tickerText: { color: colors.text }
});