import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import CurrencySelector from "../components/CurrencySelector";
import TradeTypeSelector from "../components/TradeTypeSelector";
import { colors, spacing } from "../constants/theme";

export default function InputScreen({ navigation, route }) {
    const [ticker, setTicker] = useState(route?.params?.ticker || "");
    const [tradeType, setTradeType] = useState("buy");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [currency, setCurrency] = useState("KRW");
    const [date, setDate] = useState("");

    const handleSubmit = () => {
        alert(
        `Trade: ${tradeType} ${quantity} ${ticker} at ${price} ${currency} on ${date}`
        );
    };

    useEffect(() => {
        if (route?.params?.ticker && route.params.ticker !== ticker) {
          setTicker(route.params.ticker);
        }
      }, [route?.params?.ticker]);

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>Ticker</Text>
        <View style={styles.buttonRow}>
            <Button
            title="My Holdings"
            color={colors.primary}
            onPress={() => navigation.navigate("MyHoldings", { currentTicker: ticker })}
          />
        <View style={{ width: spacing.sm }} />
        <Button
            title="Search"
            color={colors.primary}
            onPress={() => navigation.navigate("SearchTicker", { currentTicker: ticker })}
        />
        </View>
        <Text style={styles.selectedTicker}>
            {ticker ? `Selected: ${ticker}` : "No ticker selected"}
        </Text>

            <Text style={styles.label}>Trade Type</Text>
            <TradeTypeSelector value={tradeType} onChange={setTradeType} />

            <Text style={styles.label}>Quantity</Text>
            <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            placeholder="e.g. 10"
            />

            <Text style={styles.label}>Price</Text>
            <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            placeholder="e.g. 50000"
            />

            <Text style={styles.label}>Currency</Text>
            <CurrencySelector value={currency} onChange={setCurrency} />

            <Text style={styles.label}>Date</Text>
            <TextInput
            style={styles.input}
            value={date}
            onChangeText={setDate}
            placeholder="YYYY-MM-DD"
            />

            <View style={{ marginTop: spacing.md }}>
            <Button title="Add Trade" color={colors.primary} onPress={handleSubmit} />
            </View>
        </ScrollView>
        </SafeAreaView>
    );
    }

const styles = StyleSheet.create({
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
        backgroundColor: "#fff"
    },
    buttonRow: {
        flexDirection: "row",
        marginBottom: spacing.sm
    },
    selectedTicker: {
        marginBottom: spacing.sm,
        color: colors.text
    }
});
