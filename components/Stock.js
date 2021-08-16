import axios from "axios";
import * as React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage,
} from "react-native";

function Stock(props) {
    const click = async (symbol) => {
        const apiKey = "61cbd6a8e0d3081b2a7499e546b217ba";
        axios({
            method: "GET",
            url: `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${apiKey}`,
        }).then(async (res) => {
            const data = res.data[0];
            axios({
                method: "GET",
                url: `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`,
            })
                .then(async (res) => {
                    const da = {
                        ...data,
                        data: res.data[0],
                        name: props.name,
                    };
                    props.add(da);
                })
                .catch((e) => {
                    console.log(e);
                });
        });
    };

    return (
        <TouchableOpacity
            onPress={() => click(props.name)}
            style={styles.wrapper}
        >
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.full}>{props.full}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderBottomColor: "#555",
        borderBottomWidth: 1,
    },
    name: {
        color: "#fff",
        fontSize: 18,
    },
    full: {
        color: "#ddd",
        fontSize: 15,
    },
});

export default Stock;
