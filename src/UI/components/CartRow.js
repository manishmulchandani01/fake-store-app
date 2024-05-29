import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getProductById } from "../../datamodel/products";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../../datamodel/redux/cartSlice";

const CartRow = ({ id, displayOnly, quantity }) => {
    const dispatch = useDispatch();

    const itms = useSelector((state) => state?.cart?.items?.items);
    const itm = itms?.find((itm) => itm.id === id);
    const count = itm?.count ?? 0;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        getProductById(id)
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#C9AE75" />
            </View>
        );
    }
    if (error) return <Text>Error: {error}</Text>;
    return (
        <View style={styles.rowContainer}>
            <View style={styles.container}>
                {product && (
                    <View style={styles.cartItem}>
                        <Image
                            source={{ uri: product.image }}
                            style={styles.productImage}
                        />
                        <View style={styles.controlContainer}>
                            <View style={styles.productDetails}>
                                <Text style={styles.productTitle}>
                                    {product.title}
                                </Text>
                                <View style={styles.fetchedDetails}>
                                    <Text style={styles.productPrice}>
                                        ${product.price.toFixed(2)}
                                    </Text>
                                    {displayOnly && (
                                        <Text style={styles.productPrice}>
                                            Quantity: {quantity}
                                        </Text>
                                    )}
                                </View>
                                {!displayOnly && (
                                    <View style={styles.cartControls}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                dispatch(removeItem(product))
                                            }
                                        >
                                            <Ionicons
                                                name="remove-circle"
                                                size={24}
                                                color={"red"}
                                            />
                                        </TouchableOpacity>
                                        <Text style={styles.qtyText}>
                                            quantity: {count}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() =>
                                                dispatch(addItem(product))
                                            }
                                        >
                                            <Ionicons
                                                name="add-circle"
                                                size={24}
                                                color={"green"}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
    productDetails: {
        flexDirection: "column",
        width: "90%",
        gap: 5,
    },
    controlContainer: {
        flexDirection: "column",
    },
    cartControls: {
        flexDirection: "row",
        alignItems: "center",
        gap: 40,
    },
    fetchedDetails: {
        flexDirection: "row",
        gap: 10,
    },
    qtyText: {
        fontSize: "18",
    },
    centered: {
        marginTop: 20,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default CartRow;
