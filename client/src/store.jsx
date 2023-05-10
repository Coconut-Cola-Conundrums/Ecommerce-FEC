import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productSlice } from './slices/productSlice.jsx';
import { comparisonSlice } from './slices/comparisonSlice.jsx';
import { questionsSlice } from './slices/questionSlice.jsx';
import { reviewSlice } from './slices/reviewSlice.jsx';

const rootReducer = combineReducers({
  product: productSlice.reducer,
  relatedItems: comparisonSlice.reducer,
  questions: questionsSlice.reducer,
  reviews: reviewSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
