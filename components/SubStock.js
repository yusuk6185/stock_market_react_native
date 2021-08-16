import axios from "axios";
import * as React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage,
} from "react-native";

function SubStock(props) {
    const click = async (symbol) => {
        const apiKey = "61cbd6a8e0d3081b2a7499e546b217ba";
        axios({
            method: "GET",
            url: `https://financialmodelingprep.com/api/v3/historical-chart/4hour/${symbol}?apikey=${apiKey}`,
        }).then((res) => {
            props.toggleBottom(props.data, res.data);
        });
    };

    return (
        <TouchableOpacity
            onPress={() => click(props.symbol)}
            style={styles.wrapper}
        >
            <Text style={styles.text}>{props.symbol}</Text>
            <Text style={styles.price}>{props.price}</Text>
            <Text
                style={
                    props.data.changesPercentage > 0 ? styles.green : styles.red
                }
            >
                {props.data.changesPercentage.toFixed(2)}%
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        width: "100%",
        paddingHorizontal: 22,
        paddingVertical: 14,
        borderBottomColor: "#555",
        borderBottomWidth: 1,
    },
    text: {
        color: "#fff",
        fontSize: 23,
        flex: 1,
    },
    price: {
        color: "#fff",
        fontSize: 23,
        flex: 2.5,
        textAlign: "right",
        marginRight: 6,
    },
    green: {
        color: "#fff",
        fontSize: 23,
        backgroundColor: "#50D669",
        borderRadius: 7,
        paddingHorizontal: 6,
        flex: 1,
        textAlign: "center",
    },
    red: {
        color: "#fff",
        fontSize: 23,
        backgroundColor: "#CA4536",
        borderRadius: 7,
        paddingHorizontal: 6,
        flex: 1,
        textAlign: "center",
    },
});

export default SubStock;
