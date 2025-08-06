import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HEADER_TOP_MARGIN, TAB_BAR_FLOAT_MARGIN } from "../constants/dimensions";
import styles from "../styles/SearchTickerScreen.styles";

// Replace with real database or API call in production
const fakeDatabase = [
  { ticker: "MSFT", name: "Microsoft Corp" },
  { ticker: "GOOGL", name: "Alphabet Inc" },
  { ticker: "AMZN", name: "Amazon.com Inc" }
];

export default function SearchTickerScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const insets = useSafeAreaInsets();

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
    <View
      style={[
        styles.container,
        {
          paddingTop: HEADER_TOP_MARGIN,
          paddingBottom: insets.bottom + TAB_BAR_FLOAT_MARGIN
        }
      ]}
    >
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
