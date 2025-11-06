import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import axios from "axios";
import { registerUserAPI, verifyCodeAPI } from "../../api/authApi";
import { loginUserAPI } from "../../api/authApi";

const initialState = {
    users: [],
    loggedInUser: null,
    error: null,
    loading: false,
  token: null,
    // redirectTo: null,
};

export const registerUserThunk = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUserAPI(userData);
      return response;
    } catch (err) {
      // registerUserAPI lanza Error con message ya normalizado
      return rejectWithValue(err.message || "Error al registrar");
    }
  }
);

export const verifyUserThunk = createAsyncThunk(
  "auth/verify",
  async ({ email, code }, { rejectWithValue }) => {
    try {
      const response = await verifyCodeAPI(email, code);
      return response;
    } catch (err) {
      return rejectWithValue(err.message || "Error al verificar código");
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await loginUserAPI({ email, password });
      return response;
    } catch (err) {
      return rejectWithValue(err.message || "Error al iniciar sesión");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Reducer para manejo de login síncrono (compatibilidad con el componente Login.jsx)
    loginUser: (state, action) => {
      const { email, password, name } = action.payload || {};
      // Intentamos dar forma al usuario; en producción deberías usar un thunk que consulte el backend
      state.loggedInUser = {
        email: email || null,
        name: name || email || null,
      };
      state.error = null;
    },
    registerUser: (state, action) => {
      // Mantener compatibilidad: guardar usuario localmente (no usado si usas thunks)
      state.users.push(action.payload);
      state.loggedInUser = action.payload;
    },
    logoutUser: (state) => {
      state.users = [];
      state.loggedInUser = null;
      state.error = null;
      state.loading = false;
      state.emailPendingVerification = null;
      state.redirectTo = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setRedirectTo: (state, action) => {
      state.redirectTo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
            state.loading = false;
            // El backend responde { usuario } según el controller; en otros casos podría responder { email }
            state.emailPendingVerification =
              action.payload?.email || action.payload?.usuario?.email || action.payload?.user?.email || null;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        // backend responde { usuario, token }
        const rawUser = action.payload?.usuario || action.payload?.user || null;
        const token = action.payload?.token || null;
        if (rawUser) {
          state.loggedInUser = {
            name: rawUser.nombre || rawUser.name || null,
            email: rawUser.email || null,
            id: rawUser._id || rawUser.id || null,
          };
        }
        state.token = token;
        state.error = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyUserThunk.fulfilled, (state, action) => {
        // Normalizar la forma del usuario para que el frontend use siempre 'name' y 'email'
        const rawUser = action.payload?.user || action.payload?.usuario || action.payload?.user || null;
        if (rawUser) {
          state.loggedInUser = {
            name: rawUser.nombre || rawUser.name || null,
            email: rawUser.email || null,
            id: rawUser._id || rawUser.id || null,
            // incluir otros campos si se necesitan
          };
        } else {
          state.loggedInUser = null;
        }
        state.error = null;
        state.emailPendingVerification = null;
      })
      .addCase(verifyUserThunk.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});


const persistConfig = {
    key: 'auth',
    storage,
};

export const authReducer = persistReducer(persistConfig, authSlice.reducer);

export const { registerUser, loginUser, logoutUser, clearError, setRedirectTo } = authSlice.actions;