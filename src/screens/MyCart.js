import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { ScreenTitle } from "../components/ScreenTitle";

import { addItem, removeItem } from "../store/cartSlice";

export const MyCart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.controlContainer}>
                <View style={styles.productDetails}>
                    <Text style={styles.productTitle}>{item.title}</Text>
                    <Text style={styles.productPrice}>
                        ${item.price.toFixed(2)}
                    </Text>
                </View>
                <View style={styles.cartControls}>
                    <TouchableOpacity
                        onPress={() => dispatch(removeItem(item.id))}
                    >
                        <Ionicons
                            name="remove-circle"
                            size={16}
                            color={"red"}
                        />
                    </TouchableOpacity>
                    <Text>quantity: {item.quantity}</Text>
                    <TouchableOpacity onPress={() => dispatch(addItem(item))}>
                        <Ionicons name="add-circle" size={16} color={"green"} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const totalItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );
    const totalCost = cartItems
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2);
    return (
        <View style={styles.container}>
            <ScreenTitle label={"Shopping Cart"}></ScreenTitle>
            {cartItems.length === 0 ? (
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
                        renderItem={renderCartItem}
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
        paddingTop: 40,
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
    flatListContainer: {
        flex: 1,
        width: "80%",
    },
    cartItem: {
        flexDirection: "row",
        backgroundColor: "#DEDEDE",
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 5,
    },
    productImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    controlContainer: {
        flexDirection: "column",
    },
    cartControls: {
        flexDirection: "row",
        alignItems: "center",
        gap: 40,
    },
});
