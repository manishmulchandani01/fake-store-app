import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ScreenTitle } from "../components/ScreenTitle";
import { useState, useEffect } from "react";

export const ProductList = ({ route, navigation }) => {
    const { category } = route.params;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(
            `https://fakestoreapi.com/products/category/${encodeURIComponent(
                category
            )}`
        )
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [category]);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#C9AE75" />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <ScreenTitle label={category}></ScreenTitle>
            <FlatList
                style={styles.flatListContainer}
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() =>
                            navigation.navigate("Product Detail", {
                                productId: item.id.toString(),
                            })
                        }
                    >
                        <Image
                            source={{ uri: item.image }}
                            style={styles.productImage}
                        />
                        <View style={styles.productDetails}>
                            <Text style={styles.productTitle}>
                                {item.title}
                            </Text>
                            <Text style={styles.productPrice}>
                                ${item.price.toFixed(2)}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navigation.goBack()}
            >
                <Ionicons
                    style={styles.buttonText}
                    name="backspace"
                    size={16}
                />
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingTop: 40,
        paddingBottom: 20,
    },
    flatListContainer: {
        flex: 1,
        padding: 10,
        margin: 10,
        borderWidth: 2,
        borderColor: "#000",
        borderRadius: 5,
        width: "90%",
    },
    item: {
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
        flex: 1,
        justifyContent: "center",
    },
    productTitle: {
        fontSize: 16,
        textTransform: "capitalize",
        color: "#006EC8",
    },
    productPrice: {
        fontSize: 12,
        color: "#000",
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "#006EC8",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
