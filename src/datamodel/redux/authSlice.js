import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
    },
    reducers: {
        signOut(state) {
            state.user = null;
        },
        setCredentials: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { signOut, setCredentials } = authSlice.actions;
export default authSlice.reducer;
