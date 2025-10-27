import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import axios from "axios";

const initialState = {
    users: [],
    loggedInUser: null,
    error: null,
    redirectTo: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registerUser: (state, action) => {
            console.log('Registrando usuario:', action.payload)
            state.users.push(action.payload);
            state.loggedInUser = action.payload;
        },
        loginUser: (state, action) => {
            const { email, password } = action.payload;
            const user = state.users.find(user => user.email === email && user.password === password);
            if (user) {
                console.log('Usuario logueado:', user); // Registro para verificar
                state.loggedInUser = user;
                state.error = null;
                state.redirectTo = null;
            } else {
                console.error('Correo electrónico o contraseña incorrectos'); // Registro para verificar
                state.error = 'Correo electrónico o contraseña incorrectos';
            }
        },
        logoutUser: (state) => {
            state.loggedInUser = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        setRedirectTo: (state, action) => {
            state.redirectTo = action.payload;
        },

    },
});

const persistConfig = {
    key: 'auth',
    storage,
};

export const authReducer = persistReducer(persistConfig, authSlice.reducer);

export const { registerUser, loginUser, logoutUser, clearError, setRedirectTo } = authSlice.actions;