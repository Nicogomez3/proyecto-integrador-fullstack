import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    currentOrder: null,
    error: null,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        createOrder: (state, action) => {
            console.log("✅ Orden recibida en Redux:", action.payload);
            state.orders.push(action.payload);
            state.currentOrder = action.payload;
            state.error = null;
        },
        createOrderFailed: (state, action) => {
            state.error = action.payload;
        },
        startOrder: (state) => {
            state.currentOrder = null;
            state.error = null;
        },
        clearOrder: (state) => {
            state.currentOrder = null;
            state.error = null;
        },
        setOrderError: (state, action) => {
            state.error = action.payload;
        },
    }
});

export const { createOrder, createOrderFailed, startOrder, clearOrder, setOrderError } = orderSlice.actions;
export default orderSlice.reducer;