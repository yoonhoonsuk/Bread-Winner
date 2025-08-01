import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { colors, spacing } from "../constants/theme";

// Replace with real database or API call in production
const fakeDatabase = [
  { ticker: "MSFT", name: "Microsoft Corp" },
  { ticker: "GOOGL", name: "Alphabet Inc" },
  { ticker: "AMZN", name: "Amazon.com Inc" }
];

export default function SearchTickerScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (text) => {
    setQuery(text);
    if (text.length === 0) {
      setResults([]);
    } else {
      setResults(
        fakeDatabase.filter(item =>
          item.name.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={handleSearch}
        placeholder="Search by company name"
      />
      <FlatList
        data={results}
        keyExtractor={item => item.ticker}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.tickerItem}
            onPress={() => {
              navigation.navigate({
                name: "InputForm",
                params: { ticker: item.ticker },
                merge: true
              });
            }}
          >
            <Text style={styles.tickerText}>{item.ticker} ({item.name})</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          query.length > 0 && results.length === 0
            ? <Text style={styles.noResults}>No results found.</Text>
            : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
