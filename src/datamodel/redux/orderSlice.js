import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
    },
    reducers: {
        clearOrders: (state) => {
            state.orders = [];
        },
        fillOrders: (state, action) => {
            state.orders = action.payload.orders;
        },
    },
});

export const { addItem, fillOrders, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;