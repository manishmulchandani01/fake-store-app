import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ScreenTitle } from "../components/ScreenTitle";
import CartRow from "../components/CartRow";
import { useEffect } from "react";
import { updateCartItems } from "../../services/cartService";
import { newOrder } from "../../services/orderService";
import { clearCart } from "../../datamodel/redux/cartSlice";
import { fetchOrders } from "../../services/orderService";
import { fillOrders } from "../../datamodel/redux/orderSlice";

export const ShoppingCart = () => {
    const token = useSelector((state) => state?.auth?.user?.token);
    const cartItems = useSelector((state) => state.cart.items.items);
    const totalItems = useSelector((state) => state.cart.totalQuantity);
    const totalCost = useSelector((state) => state.cart.totalPrice.toFixed(2));

    const dispatch = useDispatch();

    useEffect(() => {
        updateCartItems({ token, items: cartItems });
    }, [cartItems]);

    const restoreOrders = async (token) => {
        const data = await fetchOrders(token);
        if (data.status === "OK") {
            dispatch(fillOrders({ orders: data.orders }));
        } else {
            Alert.alert(data.message);
        }
    };

    const checkoutHandler = async () => {
        if (cartItems && cartItems?.length != 0) {
            const transformCartItems = (items) => {
                return items.map((item) => ({
                    quantity: item.count,
                    prodID: item.id,
                    price: item.price,
                }));
            };
            const transformedCartItems = transformCartItems(cartItems);
            const data = await newOrder(token, transformedCartItems);
            if (data.status === "OK") {
                await restoreOrders(token);
                dispatch(clearCart());
                Alert.alert("Checkout successfully. new order is created.");
            } else {
                Alert.alert(data.message);
            }
        }
    };
    return (
        <View style={styles.container}>
            <ScreenTitle label={"Shopping Cart"}></ScreenTitle>
            {cartItems && cartItems?.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                        Your shopping cart is empty
                    </Text>
                </View>
            ) : (
                <View style={styles.detailContainer}>
                    <View style={styles.totalDetailsContainer}>
                        <Text style={styles.totalDetailsContainerText}>
                            Items: {totalItems}
                        </Text>
                        <Text style={styles.totalDetailsContainerText}>
                            Total Price: ${totalCost}
                        </Text>
                    </View>
                    <FlatList
                        data={cartItems}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <CartRow id={item.id} />}
                    />
                    <View style={styles.mainButtonContainer}>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={checkoutHandler}
                        >
                            <Text style={styles.buttonText}>Checkout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingTop: 60,
        paddingBottom: 100,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontSize: 18,
    },
    detailContainer: {
        width: "90%",
        paddingVertical: 20,
        gap: 20,
    },
    totalDetailsContainer: {
        flexDirection: "row",
        padding: 10,
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 5,
        backgroundColor: "#00A2CF",
        alignItems: "center",
        justifyContent: "space-between",
    },
    totalDetailsContainerText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#fff",
    },
    mainButtonContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    buttonContainer: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "#006EC8",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
    },
});
