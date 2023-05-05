import { configureStore } from '@reduxjs/toolkit';
import { productSlice } from './slices/productSlice.jsx';
import { comparisonSlice } from './slices/comparisonSlice.jsx';

export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    relatedItems: comparisonSlice.reducer
  },
});