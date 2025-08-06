import { StyleSheet } from "react-native";
import { colors, spacing } from "../constants/theme";

export default StyleSheet.create({
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
    backgroundColor: "#fff",
  },
  steppedInputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  steppedInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
    color: colors.text,
    fontWeight: "600",
    backgroundColor: "#fff",
  },
  stepperBtn: {
    width: 36,
    height: 36,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginLeft: 6,
  },
  stepperText: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
  },
  buttonRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginBottom: spacing.sm 
  },
  sharedButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    backgroundColor: "#fff",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  sharedButtonActive: { 
    backgroundColor: colors.primary, 
    borderColor: colors.primary 
  },
  sharedButtonText: { 
    color: colors.text, 
    fontWeight: "600", 
    fontSize: 14 
  },
  sharedButtonTextActive: { 
    color: "#fff", 
    fontWeight: "600", 
    fontSize: 14 
  },
  tradeButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 6,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  tradeButtonText: {
    fontWeight: "600",
    fontSize: 14,
  },
  selectorPillRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
    height: 40,
    justifyContent: "space-between",
  },
  selectorPillText: { 
    color: "#fff", 
    fontWeight: "600", 
    fontSize: 14, flex: 1, 
    textAlign: "center" 
  },
  clearButton: { 
    marginLeft: spacing.sm, 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "bold", 
    paddingHorizontal: 8, 
    textAlign: "right" 
  },
});
