import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import { store } from "./src/datamodel/redux/store";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./src/navigations/Tabs.js";

SplashScreen.preventAutoHideAsync();

export default function App() {
    useEffect(() => {
        const prepare = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 4000));
            } catch (e) {
                console.warn(e);
            } finally {
                await SplashScreen.hideAsync();
            }
        };
        prepare();
    }, []);
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Tabs />
            </NavigationContainer>
        </Provider>
    );
}
