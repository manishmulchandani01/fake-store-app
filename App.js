import { View, StyleSheet, Text } from "react-native";

import { Provider } from "react-redux";
import { store } from "./src/store/store";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import { Home } from "./src/screens/Home";
import { ProductList } from "./src/screens/ProductList";
import { ProductDetail } from "./src/screens/ProductDetail";
import { MyCart } from "./src/screens/MyCart";

import { useSelector } from "react-redux";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
    const cartItems = useSelector((state) => state.cart.items);
    const totalItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Products"
                component={ProductStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="My Cart"
                component={MyCart}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <View>
                            <Ionicons name="cart" color={color} size={size} />
                            {totalItems > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>
                                        {totalItems}
                                    </Text>
                                </View>
                            )}
                        </View>
                    ),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
}

function ProductStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home Stack"
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
}

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Tabs />
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({
    badge: {
        position: "absolute",
        left: 16,
        bottom: 16,
        backgroundColor: "red",
        borderRadius: 10,
        width: 16,
        height: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeText: {
        color: "white",
        fontSize: 10,
        fontWeight: "bold",
    },
});
