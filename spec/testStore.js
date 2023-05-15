import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { productSlice } from './slices/productSlice.jsx';
import { comparisonSlice } from './slices/comparisonSlice.jsx';
import { reviewSlice } from './slices/reviewSlice.jsx';
import { questionsSlice } from './slices/questionSlice.jsx';
import { render } from '@testing-library/react';

const wrapTestWithProvider = () => {
  const testStore = configureStore({
    reducer: {
      product: productSlice.reducer,
      relatedItems: comparisonSlice.reducer,
      questions: questionsSlice.reducer,
      reviews: reviewSlice.reducer
    }
  })
  return testStore
}

export default wrapTestWithProvider