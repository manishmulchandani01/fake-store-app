import { Platform } from "react-native";

// const server =
//     Platform.OS === "android" ? "http://10.0.2.2" : "http://localhost";
// const port = 3000;

// Laptop's IP Address to use the application in personal phone
const server =
    Platform.OS === "android" ? "http://10.0.2.2" : "http://192.168.0.135";
const port = 3000;

export const API_URL = `${server}:${port}`;
