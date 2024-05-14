import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state, action) => {
            const item = state.items.find((i) => i.id === action.payload.id);
            if (item) {
                item.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeItem: (state, action) => {
            const index = state.items.findIndex((i) => i.id === action.payload);
            if (index !== -1) {
                state.items[index].quantity -= 1;
                if (state.items[index].quantity === 0) {
                    state.items.splice(index, 1);
                }
            }
        },
    },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
