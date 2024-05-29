import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScreenTitle } from "../components/ScreenTitle";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { addItem } from "../../datamodel/redux/cartSlice";
import { getProductById } from "../../datamodel/products";

export const ProductDetail = ({ route, navigation }) => {
    const { productId } = route.params;
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const data = await getProductById(productId);
            setProduct(data);
            setLoading(false);
        };

        fetchProduct();
    }, [productId]);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#C9AE75" />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <ScreenTitle label={"Product Detail"}></ScreenTitle>
            <View style={styles.detailContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: product.image }}
                        style={styles.productImage}
                    />
                </View>
                <Text style={styles.productTitle}>{product.title}</Text>
                <View style={styles.miniDetailsContainer}>
                    <Text style={styles.miniDetailsText}>
                        Rating: {product?.rating?.rate}
                    </Text>
                    <Text style={styles.miniDetailsText}>
                        Sales: {product?.rating?.count}
                    </Text>
                    <Text style={styles.miniDetailsText}>
                        Price: {product.price}
                    </Text>
                </View>
                <View style={styles.mainButtonContainer}>
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
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => dispatch(addItem(product))}
                    >
                        <Ionicons
                            style={styles.buttonText}
                            name="cart"
                            size={16}
                        />
                        <Text style={styles.buttonText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.descriptionContainer}>
                    <Text style={styles.productDescription}>
                        {product.description}
                    </Text>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingTop: 60,
        paddingBottom: 20,
    },
    detailContainer: {
        width: "90%",
        paddingVertical: 20,
        gap: 10,
    },
    imageContainer: {
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 5,
        padding: 5,
        width: "100%",
        height: "40%",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
    },
    productImage: {
        width: "100%",
        height: "100%",
        maxWidth: 500,
        maxHeight: 500,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
        textTransform: "capitalize",
    },
    miniDetailsContainer: {
        flexDirection: "row",
        padding: 10,
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 5,
        backgroundColor: "#00A2CF",
        alignItems: "center",
        justifyContent: "space-between",
    },
    miniDetailsText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#fff",
    },
    descriptionContainer: {
        height: 130,
        backgroundColor: "#DEDEDE",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 5,
        padding: 5,
    },
    productDescription: {
        fontSize: 14,
        textAlign: "left",
    },
    mainButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
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
