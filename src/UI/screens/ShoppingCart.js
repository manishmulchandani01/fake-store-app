import { StyleSheet, View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { ScreenTitle } from "../components/ScreenTitle";
import CartRow from "../components/CartRow";
import { useEffect } from "react";
import { updateCartItems } from "../../services/cartService";

export const ShoppingCart = () => {
    const token = useSelector((state) => state?.auth?.user?.token);
    const cartItems = useSelector((state) => state.cart.items.items);
    const totalItems = useSelector((state) => state.cart.totalQuantity);
    const totalCost = useSelector((state) => state.cart.totalPrice.toFixed(2));

    useEffect(() => {
        updateCartItems({ token, items: cartItems });
    }, [cartItems]);
    return (
        <View style={styles.container}>
            <ScreenTitle label={"Shopping Cart"}></ScreenTitle>
            {cartItems?.length === 0 ? (
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
});
