// src/redux/selectedElementSlice.js
import { createSlice } from '@reduxjs/toolkit';

const selectedElementSlice = createSlice({
  name: 'selectedElement',
  initialState: null,
  reducers: {
    selectElement: (state, action) => action.payload,
    deselectElement: () => null,
  },
});

export const { selectElement, deselectElement } = selectedElementSlice.actions;
export default selectedElementSlice.reducer;
