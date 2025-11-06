import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import categoryReducer from './CategoriesSlice/categoriesSlice';
import menuReducer from './MenuSlice/menuSlice';
import cartReducer from './CartSlice/cartSlice';
import { authReducer } from './AuthSlice/authSlice';
import productsReducer from './ProductSlice/productSlice';
import orderReducer from './OrderSlice/orderSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  cart: cartReducer,
  menu: menuReducer,
  products: productsReducer,
  order: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorar las acciones de redux-persist que contienen callbacks no serializables
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/FLUSH',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }),
});

export const persistor = persistStore(store);
