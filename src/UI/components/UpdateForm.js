import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { colors } from "../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../components/Input";
import Button from "../components/Button";
import { updateUser } from "../../services/authService";
import { setCredentials } from "../../datamodel/redux/authSlice";

const UpdateForm = ({ formHandler }) => {
    const { user } = useSelector((state) => state.auth);
    const [name, setName] = useState(user?.name || "");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const showErrorAlert = (error) => {
        Alert.alert(error);
    };

    useEffect(() => {
        if (user?.status === "error") {
            showErrorAlert(user?.message);
        }
    }, [user]);

    const submitHandler = async () => {
        const data = await updateUser(user?.token, name, password);
        if (data.status === "OK") {
            dispatch(
                setCredentials({
                    id: user?.id,
                    name: data.name,
                    email: user?.email,
                    token: user?.token,
                })
            );
            formHandler();
            Alert.alert("User name and password update successfully.");
        } else {
            Alert.alert(data.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Update Profile</Text>
            <Input
                label="Name"
                config={{
                    placeholder: "name",
                    value: name,
                    onChangeText: setName,
                    autoCapitalize: "none",
                }}
            />
            <Input
                label="Password"
                config={{
                    placeholder: "password",
                    value: password,
                    onChangeText: setPassword,
                    secureTextEntry: true,
                }}
            />
            <View style={styles.buttonPanel}>
                <Button onPress={submitHandler}>{"Update"}</Button>
                <Button onPress={formHandler}>Cancel</Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "90%",
        backgroundColor: colors.primary700,
        padding: 5,
        borderRadius: 6,
    },
    title: {
        fontSize: 20,
        color: colors.primary50,
        fontWeight: "bold",
        paddingBottom: 5,
    },
    buttonPanel: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 10,
    },
});

export default UpdateForm;
