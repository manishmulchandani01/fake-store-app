import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        error: null,
        loading: false,
    },
    reducers: {
        signOut(state) {
            state.user = null;
            state.error = null;
            state.loading = false;
        },
        setCredentials: (state, action) => {
            state.user = action.payload;
            state.loading = false;
        },
    },
});

export const { signOut, setCredentials } = authSlice.actions;
export default authSlice.reducer;
