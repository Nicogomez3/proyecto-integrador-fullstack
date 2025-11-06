import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrdersAPI, createOrderAPI } from '../../api/ordersApi';

const initialState = {
        orders: [],
        currentOrder: null,
        loading: false,
        error: null,
};

// Thunks
export const fetchOrdersThunk = createAsyncThunk(
    'order/fetchOrders',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            const res = await fetchOrdersAPI(token);
            return res.data || [];
        } catch (err) {
            return rejectWithValue(err.message || 'Error al obtener órdenes');
        }
    }
);

export const createOrderThunk = createAsyncThunk(
    'order/createOrder',
    async (orderData, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            const res = await createOrderAPI(orderData, token);
            return res.order || res;
        } catch (err) {
            // Pasar al frontend el body de la respuesta si existe (detalle de validación)
            return rejectWithValue(err.response?.data || err.message || 'Error al crear orden');
        }
    }
);

const orderSlice = createSlice({
        name: 'order',
        initialState,
        reducers: {
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
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchOrdersThunk.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(fetchOrdersThunk.fulfilled, (state, action) => {
                    state.loading = false;
                    state.orders = action.payload;
                })
                .addCase(fetchOrdersThunk.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
                .addCase(createOrderThunk.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(createOrderThunk.fulfilled, (state, action) => {
                    state.loading = false;
                    state.currentOrder = action.payload;
                    // push to orders list
                    state.orders.push(action.payload);
                })
                .addCase(createOrderThunk.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                });
        }
});

export const { startOrder, clearOrder, setOrderError } = orderSlice.actions;
export default orderSlice.reducer;