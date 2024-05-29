import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
    },
    reducers: {
        addItem: (state, action) => {
            const existingItem = state?.items?.items?.find(
                (item) => item.id === action?.payload?.id
            );
            if (existingItem) {
                existingItem.count += 1;
                state.totalQuantity += 1;
                state.totalPrice += action.payload.price;
            } else {
                state?.items?.items?.push({
                    id: action.payload.id,
                    price: action.payload.price,
                    count: 1,
                });
                state.totalQuantity += 1;
                state.totalPrice += action.payload.price;
            }
        },
        removeItem: (state, action) => {
            const index = state?.items?.items?.findIndex(
                (item) => item.id === action?.payload?.id
            );
            if (index !== -1) {
                const currentItem = state?.items?.items[index];
                if (currentItem.count > 1) {
                    currentItem.count -= 1;
                    state.totalQuantity -= 1;
                    state.totalPrice -= currentItem.price;
                } else {
                    state?.items?.items?.splice(index, 1);
                    state.totalQuantity -= 1;
                    state.totalPrice -= currentItem.price;
                }
            }
        },
        clearCart: (state) => {
            state.items.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
        fillCart: (state, action) => {
            state.items = action.payload;
            state.totalQuantity = action?.payload?.items?.reduce(
                (total, item) => total + item.count,
                0
            );
            state.totalPrice = action?.payload?.items?.reduce(
                (total, item) => total + item.price * item.count,
                0
            );
        },
    },
});

export const { addItem, removeItem, clearCart, fillCart } = cartSlice.actions;
export default cartSlice.reducer;
