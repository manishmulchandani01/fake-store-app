import { StyleSheet, View } from "react-native";
import LoginForm from "../components/LoginForm";

export const SignIn = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <LoginForm navigation={navigation} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
