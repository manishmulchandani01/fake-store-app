import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { signOut } from "../../datamodel/redux/authSlice";
import { clearCart } from "../../datamodel/redux/cartSlice";
import { clearOrders } from "../../datamodel/redux/orderSlice";

const ProfileDetail = ({ user, formHandler }) => {
    const dispatch = useDispatch();

    const signOutHandler = () => {
        dispatch(clearCart());
        dispatch(clearOrders());
        dispatch(signOut());
    };

    return (
        <View style={styles.detailContainer}>
            <View style={styles.row}>
                <Text style={styles.boldText}>Name:</Text>
                <Text style={styles.plainText}>{user.name}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.boldText}>Email:</Text>
                <Text style={styles.plainText}>{user.email}</Text>
            </View>
            <View style={styles.mainButtonContainer}>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={formHandler}
                >
                    <Ionicons
                        style={styles.buttonText}
                        name="create"
                        size={16}
                    />
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={signOutHandler}
                >
                    <Ionicons
                        style={styles.buttonText}
                        name="log-out"
                        size={16}
                    />
                    <Text style={styles.buttonText}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    detailContainer: {
        width: "80%",
        paddingVertical: 20,
        gap: 20,
    },
    mainButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    boldText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    plainText: {
        fontSize: 18,
    },
    buttonContainer: {
        marginTop: 20,
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
    row: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
});

export default ProfileDetail;
