import React, { useState, useEffect, useCallback } from "react";
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import SubStock from "../components/SubStock";
import { useFocusEffect } from "@react-navigation/native";
import { LineChart } from "react-native-chart-kit";

export default function StocksScreen({ route, navigation }) {
    const {  watchList } = useStocksContext();
    const [value, setValue] = useState({});
    const [values, setValues] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    // can put more code here

    useFocusEffect(
        useCallback(() => {
            setIsVisible(false);
        }, [])
    );

    useEffect(() => {
        setStocks(watchList);
    }, [watchList]);

    const toggleBottom = (values, historys) => {
        setValue(values);
        setValues(historys);
        setIsVisible(true);
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {stocks.map((val) => (
                    <SubStock
                        key={val.symbol}
                        name={val.companyName}
                        price={val.price}
                        value={val.changes}
                        symbol={val.symbol}
                        toggleBottom={toggleBottom}
                        data={val.data}
                    />
                ))}
            </ScrollView>
            {isVisible === true && (
                <View style={styles.visibleBottom}>
                    <Text style={styles.title}>{value.name}</Text>
                    <View style={styles.rowW}>
                        <View style={styles.row}>
                            <Text style={styles.name}>D-high</Text>
                            <Text style={styles.value}>{value.dayHigh}</Text>
                        </View>
                        <View style={styles.row1}>
                            <Text style={styles.name}>D-low</Text>
                            <Text style={styles.value}>{value.dayLow}</Text>
                        </View>
                    </View>
                    <View style={styles.rowW}>
                        <View style={styles.row}>
                            <Text style={styles.name}>Y-high</Text>
                            <Text style={styles.value}>{value.yearHigh}</Text>
                        </View>
                        <View style={styles.row1}>
                            <Text style={styles.name}>Y-low</Text>
                            <Text style={styles.value}>{value.yearLow}</Text>
                        </View>
                    </View>
                    <View style={styles.rowW}>
                        <View style={styles.row}>
                            <Text style={styles.name}>Volume</Text>
                            <Text style={styles.value}>{value.volume}</Text>
                        </View>
                        <View style={styles.row1}>
                            <Text style={styles.name}>P/E</Text>
                            <Text style={styles.value}>{value.pe}</Text>
                        </View>
                    </View>
                    <LineChart
                        width={Dimensions.get("window").width - 30} // from react-native
                        height={165}
                        yAxisLabel="$"
                        yAxisSuffix="k"
                        yAxisInterval={1}
                        data={{
                            datasets: [{ data: values.map((val) => val.open) }],
                        }}
                        chartConfig={{
                            backgroundColor: "#666",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) =>
                                `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) =>
                                `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 1,
                            },
                            propsForDots: {
                                r: "1",
                                strokeWidth: "3",
                                stroke: "#ccc",
                            },
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => setIsVisible(false)}
                        style={styles.button}
                    >
                        <Text style={styles.bt}>x</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    bt: {
        color: "#ddd",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 20,
    },
    button: {
        position: "absolute",
        top: "100%",
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: "#666",
        right: 5,
        transform: [{ translateY: -295 }],
    },
    container: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
    },
    bottom: {
        backgroundColor: "#141414",
        position: "absolute",
        top: "100%",
        width: "100%",
    },
    visibleBottom: {
        backgroundColor: "#141414",
        position: "absolute",
        top: "100%",
        height: 330,
        transform: [{ translateY: -330 }],
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 14,
    },
    rowW: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 6,
    },
    row1: {
        display: "flex",
        flexDirection: "row",
        borderTopColor: "#333333",
        borderTopWidth: 1,
        flex: 1,
        marginLeft: 10,
    },
    row: {
        display: "flex",
        flexDirection: "row",
        borderTopColor: "#333333",
        borderTopWidth: 1,
        flex: 1,
    },
    title: {
        color: "#fff",
        fontSize: 20,
        marginBottom: 6,
        textAlign: "center",
    },
    name: {
        fontSize: 20,
        color: "#aaa",
        flex: 2,
    },
    value: {
        fontSize: 20,
        color: "#fff",
        flex: 3,
        textAlign: "right",
    },
    // FixMe: add styles here ...
    // use scaleSize(x) to adjust sizes for small/large screens
});
