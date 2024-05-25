import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../UI/screens/Home";
import { ProductList } from "../UI/screens/ProductList";
import { ProductDetail } from "../UI/screens/ProductDetail";

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Product List"
                component={ProductList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Product Detail"
                component={ProductDetail}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default HomeStack;
