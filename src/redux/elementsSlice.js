// src/redux/elementsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const elementsSlice = createSlice({
  name: 'elements',
  initialState: [],
  reducers: {
    addElement: (state, action) => {
      state.push(action.payload);
    },
    updateElement: (state, action) => {
      const { id, position, properties } = action.payload;
      const index = state.findIndex(el => el.id === id);
      if (index !== -1) {
        if (position) {
          state[index].position = position;
        }
        if (properties) {
          state[index].properties = {
            ...state[index].properties,
            ...properties,
          };
        }
      }
    },
    removeElement: (state, action) => {
      return state.filter(el => el.id !== action.payload);
    },
    rearrangeElements: (state, action) => {
      const { id, newIndex } = action.payload;
      const currentIndex = state.findIndex(el => el.id === id);
      if (currentIndex !== -1) {
        const elementToMove = state[currentIndex];
        // Remove the element from the current position
        state.splice(currentIndex, 1);
        // Insert the element at the new position
        state.splice(newIndex, 0, elementToMove);
      }
    },
  },
});

export const { addElement, updateElement, removeElement, rearrangeElements } = elementsSlice.actions;
export default elementsSlice.reducer;
