import { StyleSheet } from "react-native";
import { colors } from "../constants/theme";
import { PADDING_HORIZONTAL, HEADER_TOP_MARGIN } from "../constants/dimensions";

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  listContent: {},
  // For the summary at the very top
  topSummaryWrap: {
    paddingTop: HEADER_TOP_MARGIN,
    paddingBottom: 8,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  topSummaryLabel: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#7f5539"
  },
  topSummaryValue: {
    fontWeight: "bold",
    fontSize: 16
  },
  sectionHeaderTouchable: {
    backgroundColor: "#f0ede5",
    paddingVertical: 9,
    paddingHorizontal: PADDING_HORIZONTAL,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e3e3e3",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  sectionHeaderText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#7f5539"
  },
  sectionHeaderValue: {
    fontWeight: "bold",
    fontSize: 15,
    minWidth: 70,
    textAlign: "right"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: PADDING_HORIZONTAL,
    backgroundColor: colors.background,
  },
  valueCol: {
    alignItems: 'flex-end'
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#e5e5e5",
    marginLeft: PADDING_HORIZONTAL
  },
  company: {
    fontWeight: "bold",
    fontSize: 14,
    color: colors.text,
  },
  ticker: {
    fontWeight: "400",
    fontSize: 12,
    color: colors.muted,
    marginTop: 2
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
    textAlign: "right",
  },
  gain: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 2,
    textAlign: "right",
  },
});
