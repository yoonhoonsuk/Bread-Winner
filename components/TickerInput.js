import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors, spacing } from "../constants/theme";

// Mock data for holdings and search results (replace with real data/fetch in the future)
const myHoldings = [
  { ticker: "AAPL", name: "Apple Inc." },
  { ticker: "005930", name: "Samsung Electronics" },
  { ticker: "TSLA", name: "Tesla" }
];
// Simulate async database search (replace with real API)
const fakeDatabaseSearch = query =>
  [
    { ticker: "MSFT", name: "Microsoft Corp" },
    { ticker: "GOOGL", name: "Alphabet Inc" },
    { ticker: "AMZN", name: "Amazon.com Inc" }
  ].filter(item => item.name.toLowerCase().includes(query.toLowerCase()));

export default function TickerInput({ value, onChange }) {
  const [mode, setMode] = useState("holdings"); // "holdings" or "search"
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Handler for search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    // In a real app, you would fetch results from your backend
    setSearchResults(query.length > 0 ? fakeDatabaseSearch(query) : []);
  };

  return (
    <View>
      {/* Segmented buttons */}
      <View style={styles.segmentedGroup}>
        <TouchableOpacity
          style={[
            styles.segmentButton,
            mode === "holdings" && styles.segmentButtonActive
          ]}
          onPress={() => setMode("holdings")}
        >
          <Text
            style={[
              styles.segmentText,
              mode === "holdings" && styles.segmentTextActive
            ]}
          >
            My Holdings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.segmentButton,
            mode === "search" && styles.segmentButtonActive
          ]}
          onPress={() => setMode("search")}
        >
          <Text
            style={[
              styles.segmentText,
              mode === "search" && styles.segmentTextActive
            ]}
          >
            Search
          </Text>
        </TouchableOpacity>
      </View>
      {/* Ticker selection */}
      {mode === "holdings" ? (
        <FlatList
          data={myHoldings}
          keyExtractor={item => item.ticker}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.listItem,
                value === item.ticker && styles.listItemSelected
              ]}
              onPress={() => onChange(item.ticker)}
            >
              <Text style={styles.listText}>{item.ticker} ({item.name})</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View>
          <TextInput
            style={styles.input}
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Search by company name"
          />
          <FlatList
            data={searchResults}
            keyExtractor={item => item.ticker}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.listItem,
                  value === item.ticker && styles.listItemSelected
                ]}
                onPress={() => {
                  onChange(item.ticker);
                  setSearchQuery(item.name); // show selected
                }}
              >
                <Text style={styles.listText}>{item.ticker} ({item.name})</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              searchQuery.length > 0 && searchResults.length === 0
                ? <Text style={styles.noResults}>No results found.</Text>
                : null
            }
            style={{ maxHeight: 150 }}
          />
        </View>
      )}
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
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    backgroundColor: "#fff"
  },
  listItem: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  listItemSelected: {
    backgroundColor: colors.primary + "22" // subtle highlight
  },
  listText: {
    color: colors.text
  },
  noResults: {
    color: colors.muted,
    textAlign: "center",
    padding: spacing.sm
  }
});
