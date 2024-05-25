import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import LoginForm from "../components/LoginForm";
import ProfileDetail from "../components/ProfileDetail";
import UpdateForm from "../components/UpdateForm";
import { ScreenTitle } from "../components/ScreenTitle";

export const UserProfile = () => {
    const { user } = useSelector((state) => state.auth);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    if (!user?.token) {
        return (
            <View style={styles.loginContainer}>
                <LoginForm />
            </View>
        );
    }

    const formHandler = () => {
        if (showUpdateForm) {
            setShowUpdateForm(false);
        } else {
            setShowUpdateForm(true);
        }
    };

    return (
        <View style={styles.container}>
            <ScreenTitle label={"User Profile"}></ScreenTitle>
            {showUpdateForm ? (
                <UpdateForm formHandler={() => formHandler()} />
            ) : (
                <ProfileDetail user={user} formHandler={() => formHandler()} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 60,
        paddingBottom: 20,
        gap: 20,
    },
    loginContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
