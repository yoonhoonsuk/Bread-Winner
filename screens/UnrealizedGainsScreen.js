import React, { useState } from "react";
import { SafeAreaView, SectionList, View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../constants/theme";
import { HEADER_TOP_MARGIN, TAB_BAR_FLOAT_MARGIN } from "../constants/dimensions";
import styles from "../styles/UnrealizedGainsScreen.styles";

const DATA = [
  { title: "Korean Stocks", data: [ { id: "1", ticker: "005930", name: "Samsung Electronics", value: 6000000, gain: -8.2, currency: "KRW" }, ] },
  { title: "US Stocks", data: [ { id: "2", ticker: "AAPL", name: "Apple Inc.", value: 5000000, gain: 12.5, currency: "USD" }, { id: "3", ticker: "TSLA", name: "Tesla", value: 2500000, gain: 0, currency: "USD" }, ] },
  { title: "Bonds", data: [ { id: "4", ticker: "USBOND1", name: "US Treasury", value: 1000000, gain: 2.2, currency: "USD" }, ] },
  { title: "Funds", data: [ { id: "5", ticker: "KRFUND1", name: "Korea Equity Fund", value: 700000, gain: -1.2, currency: "KRW" }, ] }
];

function calcSectionTotal(section) {
  return section.data.reduce((sum, x) => sum + x.gain, 0);
}
function calcOverallTotal(sections) {
  return sections.reduce((sum, section) => sum + calcSectionTotal(section), 0);
}
function getGainColor(gain) {
  return gain > 0 ? colors.buy_gain : gain < 0 ? colors.sell_loss : colors.par;
}

export default function UnrealizedGainsScreen() {
  const insets = useSafeAreaInsets();
  const [collapsed, setCollapsed] = useState({});
  const handleToggle = (title) => setCollapsed(prev => ({ ...prev, [title]: !prev[title] }));

  const displaySections = DATA.map(section =>
    collapsed[section.title] ? { ...section, data: [] } : section
  );
  const sectionTotals = Object.fromEntries(DATA.map(sec => [sec.title, calcSectionTotal(sec)]));
  const overallTotal = calcOverallTotal(DATA);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSummaryWrap}>
        <Text style={styles.topSummaryLabel}>Total Unrealized</Text>
        <Text style={[styles.topSummaryValue, { color: getGainColor(overallTotal) }]}>
          {overallTotal > 0 ? "+" : ""}
          {overallTotal.toLocaleString()}%
        </Text>
      </View>
      <SectionList
        sections={displaySections}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          paddingBottom: insets.bottom + TAB_BAR_FLOAT_MARGIN
        }}
        renderSectionHeader={({ section }) => (
          <TouchableOpacity
            onPress={() => handleToggle(section.title)}
            style={styles.sectionHeaderTouchable}
            activeOpacity={0.85}
          >
            <Text style={styles.sectionHeaderText}>
              {section.title} {collapsed[section.title] ? "▸" : "▾"}
            </Text>
            <Text
              style={[
                styles.sectionHeaderValue,
                { color: getGainColor(sectionTotals[section.title]) }
              ]}
            >
              {sectionTotals[section.title] > 0 ? "+" : ""}
              {sectionTotals[section.title].toLocaleString()}%
            </Text>
          </TouchableOpacity>
        )}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View>
              <Text style={styles.company}>{item.name}</Text>
              <Text style={styles.ticker}>{item.ticker}</Text>
            </View>
            <View style={styles.valueCol}>
              <Text style={styles.value}>
                {item.value.toLocaleString()} {item.currency}
              </Text>
              <Text
                style={[
                  styles.gain,
                  { color: getGainColor(item.gain) }
                ]}
              >
                {item.gain > 0 ? "+" : ""}
                {item.gain}%
              </Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        stickySectionHeadersEnabled={false}
      />
    </SafeAreaView>
  );
}
