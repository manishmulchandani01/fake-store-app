import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";

import { ScreenTitle } from "../components/ScreenTitle";
import { useState, useEffect } from "react";

export const Home = ({ navigation }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch("https://fakestoreapi.com/products/categories")
            .then((res) => res.json())
            .then((data) => {
                setCategories(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#C9AE75" />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <ScreenTitle label={"Categories"}></ScreenTitle>
            <FlatList
                style={styles.flatListContainer}
                data={categories}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() =>
                            navigation.navigate("Product List", {
                                category: item,
                            })
                        }
                    >
                        <Text style={styles.itemTitle}>{item}</Text>
                    </TouchableOpacity>
                )}
            />
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
        backgroundColor: "#DEDEDE",
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 5,
    },
    itemTitle: {
        fontSize: 16,
        textTransform: "capitalize",
        color: "#006EC8",
        fontWeight: "bold",
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
