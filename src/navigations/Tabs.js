import React from "react";
import { View, Alert } from "react-native";
import { useSelector } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { ShoppingCart } from "../UI/screens/ShoppingCart";
import { Order } from "../UI/screens/Order";
import HomeStack from "./HomeStack";
import { UserProfile } from "../UI/screens/UserProfile";

const Tab = createBottomTabNavigator();

function authGuard(navigation, user, name) {
    return {
        tabPress: (e) => {
            e.preventDefault();
            if (user?.token) {
                navigation.navigate(name);
            } else {
                Alert.alert(
                    "Not Logged In",
                    "You must log in to view this tab."
                );
            }
        },
    };
}

const Tabs = () => {
    const user = useSelector((state) => state.auth.user);
    const totalItems = useSelector((state) => state.cart.totalQuantity);
    const orders = useSelector((state) => state.order.orders);
    const totalUnpaidOrders = orders?.filter((o) => o.is_paid != 1);
    return (
        <Tab.Navigator initialRouteName="User Profile">
            <Tab.Screen
                name="Products"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
                listeners={({ navigation }) =>
                    authGuard(navigation, user, "Products")
                }
            />
            <Tab.Screen
                name="My Cart"
                component={ShoppingCart}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <View>
                            <Ionicons name="cart" color={color} size={size} />
                        </View>
                    ),
                    tabBarBadge: totalItems || undefined,
                    headerShown: false,
                }}
                listeners={({ navigation }) =>
                    authGuard(navigation, user, "My Cart")
                }
            />
            <Tab.Screen
                name="My Orders"
                component={Order}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <View>
                            <Ionicons
                                name="gift-outline"
                                color={color}
                                size={size}
                            />
                        </View>
                    ),
                    tabBarBadge: totalUnpaidOrders?.length || undefined,
                    headerShown: false,
                }}
                listeners={({ navigation }) =>
                    authGuard(navigation, user, "My Orders")
                }
            />
            <Tab.Screen
                name="User Profile"
                component={UserProfile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="person-circle"
                            color={color}
                            size={size}
                        />
                    ),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
};

export default Tabs;
