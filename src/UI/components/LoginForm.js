import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { colors } from "../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../datamodel/redux/authSlice";
import { Input } from "../components/Input";
import Button from "../components/Button";
import { signInUser, signUpUser } from "../../services/authService";
import { fillCart } from "../../datamodel/redux/cartSlice";
import { fetchCartItems } from "../../services/cartService";

const signInTexts = {
    title: "Sign in with email and password",
    button: "Sign In",
    switch: "Sign up for a new account",
};

const signUpTexts = {
    title: "Sign up a new user",
    button: "Sign Up",
    switch: "Sign in to a existing account",
};

const initValues = {
    name: { value: "" },
    email: { value: "" },
    password: { value: "" },
};

const LoginForm = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [formTexts, setFormTexts] = useState(signInTexts);
    const [inputs, setInputs] = useState(initValues);

    const dispatch = useDispatch();

    const inputHandler = (inputIdentifier, value) => {
        setInputs((curState) => {
            return { ...curState, [inputIdentifier]: value };
        });
    };

    const clearHandler = () => {
        setInputs(initValues);
    };

    const switchHandler = () => {
        if (isSignIn) {
            setIsSignIn(false);
            setFormTexts(signUpTexts);
        } else {
            setIsSignIn(true);
            setFormTexts(signInTexts);
        }
    };

    const restoreCart = async (token) => {
        const data = await fetchCartItems(token);
        if (data.status === "OK") {
            dispatch(fillCart({ items: data.items }));
        } else {
            Alert.alert(data.message);
        }
    };

    const submitHandler = async () => {
        const { name, email, password } = inputs;
        const data = isSignIn
            ? await signInUser(email, password)
            : await signUpUser(name, email, password);
        if (data.status === "OK") {
            dispatch(
                setCredentials({
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    token: data.token,
                })
            );
            await restoreCart(data.token);
        } else {
            Alert.alert(data.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{formTexts.title}</Text>
            {!isSignIn && (
                <Input
                    label="Name"
                    config={{
                        placeholder: "name",
                        value: inputs.name,
                        onChangeText: inputHandler.bind(null, "name"),
                        autoCapitalize: "none",
                    }}
                />
            )}
            <Input
                label="Email"
                config={{
                    placeholder: "email address",
                    value: inputs.email,
                    onChangeText: inputHandler.bind(null, "email"),
                    autoCapitalize: "none",
                }}
            />
            <Input
                label="Password"
                config={{
                    placeholder: "password",
                    value: inputs.password,
                    onChangeText: inputHandler.bind(null, "password"),
                    secureTextEntry: true,
                }}
            />
            <View style={styles.buttonPanel}>
                <Button onPress={clearHandler}>Clear</Button>
                <Button onPress={submitHandler}>{formTexts.button}</Button>
            </View>
            <TouchableOpacity onPress={switchHandler}>
                <Text style={styles.switch}>{formTexts.switch}</Text>
            </TouchableOpacity>
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
    switch: {
        fontSize: 16,
        color: colors.primary100,
        padding: 10,
        alignSelf: "center",
    },
});

export default LoginForm;
