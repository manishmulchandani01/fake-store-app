import { Text, View, StyleSheet } from "react-native";

export const ScreenTitle = ({ label }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "90%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 5,
        backgroundColor: "#00A2CF",
        alignItems: "center",
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        textTransform: "capitalize",
    },
});
