import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCartAPI, setCartAPI, updateCartItemAPI, removeCartItemAPI } from '../../api/cartApi';

const initialState = {
  items: [],
  isOpen: false,
  status: 'idle',
  error: null,
};

// Thunks
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    if (!token) return { items: [], total: 0 };
    const res = await getCartAPI(token);
    return res.data || res;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const saveCart = createAsyncThunk('cart/saveCart', async (_, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const items = getState().cart.items;
    if (!token) {
      console.log('[saveCart] no token - skipping server, items:', items);
      return { items };
    }
    console.log('[saveCart] sending items to server:', items);
    const res = await setCartAPI(items, token);
    console.log('[saveCart] server response:', res);
    return res.data || res;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const updateCartItem = createAsyncThunk('cart/updateCartItem', async ({ itemId, quantity }, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    if (!token) {
      // update local state only
      return { items: getState().cart.items };
    }
    const res = await updateCartItemAPI(itemId, quantity, token);
    return res.data || res;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const removeCartItem = createAsyncThunk('cart/removeCartItem', async (itemId, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    if (!token) {
      return { items: getState().cart.items.filter((it) => String(it.id) !== String(itemId)) };
    }
    const res = await removeCartItemAPI(itemId, token);
    return res.data || res;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    // local update used by thunks for optimistic updates
    addItemLocal: (state, action) => {
      if (!action.payload || !action.payload.id) return;
      const item = state.items.find((item) => String(item.id) === String(action.payload.id));
      if (item) item.quantity += 1;
      else state.items.push({ ...action.payload, quantity: 1 });
    },
    incrementItemQuantityLocal: (state, action) => {
      const item = state.items.find((item) => String(item.id) === String(action.payload));
      if (item) item.quantity += 1;
    },
    decrementItemQuantityLocal: (state, action) => {
      const item = state.items.find((item) => String(item.id) === String(action.payload));
      if (item && item.quantity > 1) item.quantity -= 1;
      else state.items = state.items.filter((item) => String(item.id) !== String(action.payload));
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const payload = action.payload;
        state.items = (payload && (payload.data?.items || payload.items || (Array.isArray(payload) ? payload : null))) || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error?.message;
      })
      .addCase(saveCart.fulfilled, (state, action) => {
        const payload = action.payload;
        console.log('[cartSlice] saveCart.fulfilled payload:', payload);
        const serverItems = (payload && (payload.data?.items || payload.items || (Array.isArray(payload) ? payload : null))) || [];
        if (!serverItems || serverItems.length === 0) {
          return;
        }
        state.items = serverItems.map((s) => {
          const local = state.items.find((it) => String(it.id) === String(s.id) || String(it._id) === String(s._id));
          return { ...(local || {}), ...(s || {}) };
        });
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const payload = action.payload;
        const serverItems = (payload && (payload.data?.items || payload.items || (Array.isArray(payload) ? payload : null))) || [];
        if (!serverItems || serverItems.length === 0) return;
        state.items = serverItems.map((s) => {
          const local = state.items.find((it) => String(it.id) === String(s.id) || String(it._id) === String(s._id));
          return { ...(local || {}), ...(s || {}) };
        });
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        const payload = action.payload;
        const serverItems = (payload && (payload.data?.items || payload.items || (Array.isArray(payload) ? payload : null))) || [];
        if (!serverItems || serverItems.length === 0) return;
        state.items = serverItems.map((s) => {
          const local = state.items.find((it) => String(it.id) === String(s.id) || String(it._id) === String(s._id));
          return { ...(local || {}), ...(s || {}) };
        });
      });
  },
});

export const { toggleCart, addItemLocal, incrementItemQuantityLocal, decrementItemQuantityLocal, clearCart } = cartSlice.actions;

// Thunk that performs local update then persists to API
export const addItemToCart = (product) => async (dispatch) => {
  console.log('[addItemToCart] product:', product);
  dispatch(addItemLocal(product));
  try {
    const res = await dispatch(saveCart());
    console.log('[addItemToCart] saveCart result:', res);
  } catch (e) {
    // ignore for now; saveCart will capture error in state
    console.error('Error al guardar carrito', e);
  }
};

export default cartSlice.reducer;