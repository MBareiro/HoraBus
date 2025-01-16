// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'
import operadorReducer from './slices/operadorSlice'


const store = configureStore({
  reducer: {
    user: userReducer,
    operador: operadorReducer
  },
});

export default store;

