// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import elementsReducer from './elementsSlice';
import selectedElementReducer from './selectedElementSlice';

const store = configureStore({
  reducer: {
    elements: elementsReducer,
    selectedElement: selectedElementReducer,
  },
});

export default store;
