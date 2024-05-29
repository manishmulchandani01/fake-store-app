import { Platform } from "react-native";

const server =
    Platform.OS === "android" ? "http://10.0.2.2" : "http://localhost";
const port = 3000;

// My laptop's IP Address to use the application in personal phone using Expo Go app.
// const server =
//     Platform.OS === "android" ? "http://10.0.2.2" : "http://192.168.0.135";
// const port = 3000;

export const API_URL = `${server}:${port}`;
