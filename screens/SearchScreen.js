import React, { useState, useEffect, useRef } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import axios from "axios";
import { Colors } from "react-native/Libraries/NewAppScreen";
import ss from "../assets/search";
import { SvgXml } from "react-native-svg";
import Stock from "../components/Stock";

export default function SearchScreen({ navigation }) {
    const apiKey = "61cbd6a8e0d3081b2a7499e546b217ba";
    const { ServerURL, addToWatchlist } = useStocksContext();
    const [stocks, setStocks] = useState([]);
    const [search, setSearch] = useState("");
    const [searched, setSearched] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const searchRef = useRef();

    useEffect(() => {
        axios({
            method: "get",
            url: `https://financialmodelingprep.com/api/v3/search-ticker?query=A&limit=300&exchange=NASDAQ&apikey=${apiKey}`,
        })
            .then((res) => {
                setStocks(
                    res.data.sort((a, b) => {
                        let x = a.symbol;
                        let y = b.symbol;
                        if (x < y) {
                            return -1;
                        }
                        if (x > y) {
                            return 1;
                        }
                        return 0;
                    })
                );
                setSearched(
                    res.data.sort((a, b) => {
                        let x = a.symbol;
                        let y = b.symbol;
                        if (x < y) {
                            return -1;
                        }
                        if (x > y) {
                            return 1;
                        }
                        return 0;
                    })
                );
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    const searchStock = () => {
        if (search === "") {
            setSearched(stocks);
            return;
        }
        setSearched(
            stocks
                .filter((val) => {
                    let isFil = false;
                    if (
                        val.name.toLowerCase().indexOf(search.toLowerCase()) !=
                            -1 ||
                        val.symbol
                            .toLowerCase()
                            .indexOf(search.toLowerCase()) != -1
                    )
                        isFil = true;
                    return isFil;
                })
                .sort((a, b) => {
                    let x = a.symbol;
                    let y = b.symbol;
                    if (x < y) {
                        return -1;
                    }
                    if (x > y) {
                        return 1;
                    }
                    return 0;
                })
        );
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.searchBar}>
                    <View style={styles.search}>
                        <TouchableOpacity
                            onPress={searchStock}
                            style={styles.button}
                        >
                            <SvgXml width="23" height="23" xml={ss} />
                        </TouchableOpacity>
                        <TextInput
                            ref={searchRef}
                            style={styles.input}
                            onChangeText={setSearch}
                            value={search}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                        />
                        {isFocus === true && (
                            <TouchableOpacity
                                onPress={() => setSearch("")}
                                style={styles.button}
                            >
                                <Text style={styles.ax}>x</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    {isFocus === true && (
                        <TouchableOpacity
                            onPress={() => searchRef.current.blur()}
                            style={styles.button}
                        >
                            <Text style={styles.blue}>CANCEL</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <ScrollView>
                    {searched.map((val) => (
                        <Stock
                            key={val.symbol}
                            name={val.symbol}
                            full={val.name}
                            add={addToWatchlist}
                        />
                    ))}
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
    },
    input: {
        width: "100%",
        paddingVertical: 4,
        backgroundColor: "#222222",
        color: Colors.white,
        borderRadius: 5,
        marginLeft: 6,
        flex: 1,
    },
    text: {
        color: Colors.white,
    },
    button: {
        color: Colors.white,
        display: "flex",
        alignItems: "center",
    },
    search: {
        display: "flex",
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#222222",
        overflow: "hidden",
        borderRadius: 5,
        alignItems: "center",
        paddingHorizontal: 5,
    },
    searchBar: {
        backgroundColor: "#141414",
        padding: 8,
        display: "flex",
        width: "100%",
        flexDirection: "row",
    },
    blue: {
        color: "#2379ed",
        flex: 1,
        marginLeft: 6,
        textAlignVertical: "center",
    },
    ax: {
        flex: 1,
        color: "#fff",
        paddingHorizontal: 6,
        marginVertical: 7.5,
        borderRadius: 10,
        backgroundColor: "#555555",
        textAlignVertical: "center",
    },
});
