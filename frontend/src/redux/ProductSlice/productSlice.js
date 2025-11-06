import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductsAPI } from '../../api/productsApi';

const initialState = {
  products: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Thunk to fetch products from backend
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const res = await fetchProductsAPI();
  // fetchProductsAPI returns an object { data: [...] } or an array; normalize to array
  return res.data || res;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || 'Failed to load products';
      });
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;