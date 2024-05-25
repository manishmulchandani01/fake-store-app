import { Text, TextInput, View, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
export const Input = ({ label, style, config, invalid }) => {
    let inputStyles = [styles.input];
    if (config && config.multiline) {
        inputStyles.push(styles.inputMultiline);
    }
    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>
                {label}
            </Text>
            <TextInput
                style={[inputStyles, invalid && styles.invalidBackground]}
                {...config}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: { fontSize: 14, color: colors.primary100, marginBottom: 4 },
    input: {
        backgroundColor: colors.primary100,
        color: colors.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: "top",
    },
    invalidLabel: {
        color: colors.error500,
    },
    invalidBackground: {
        backgroundColor: colors.error50,
    },
});
