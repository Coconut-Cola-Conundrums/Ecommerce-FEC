import { configureStore } from '@reduxjs/toolkit';
import { productSlice } from './slices/productSlice.jsx';
import { comparisonSlice } from './slices/comparisonSlice.jsx';
import {reviewSlice} from './slices/reviewSlice.jsx'

import { questionsSlice } from './slices/questionSlice.jsx';

export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    relatedItems: comparisonSlice.reducer,
    questions: questionsSlice.reducer,
    reviews: reviewSlice.reducer
  },
});