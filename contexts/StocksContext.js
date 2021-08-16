import React, { useState, useContext, useEffect } from "react";
import { AsyncStorage } from "react-native";

const StocksContext = React.createContext();

export const StocksProvider = ({ children }) => {
    const [state, setState] = useState([]);

    return (
        <StocksContext.Provider value={[state, setState]}>
            {children}
        </StocksContext.Provider>
    );
};

export const useStocksContext = () => {
    const [state, setState] = useContext(StocksContext);

    // can put more code here

    async function addToWatchlist(newSymbol) {
        let getS = await AsyncStorage.getItem("subStocks");
        let stocks;
        if (getS === null) stocks = [];
        else stocks = JSON.parse(getS);
        if (
            stocks.findIndex((val) => {
                if (val.symbol == newSymbol.symbol) return true;
            }) != -1
        )
            return;
        setState([...state, newSymbol]);

        stocks.push(newSymbol);

        await AsyncStorage.setItem("subStocks", JSON.stringify(stocks));
    }

    useEffect(() => {
        (async function () {
            const getS = await AsyncStorage.getItem("subStocks");
            if (getS === null) return;
            const stocks = JSON.parse(getS);
            setState(stocks);
        })();
    }, []);

    return {
        ServerURL: "http://131.181.190.87:3001",
        watchList: state,
        addToWatchlist,
    };
};
