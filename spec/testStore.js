import { configureStore } from '@reduxjs/toolkit';
import { productSlice } from '../client/src/slices/productSlice.jsx';
import { comparisonSlice } from '../client/src/slices/comparisonSlice.jsx';
import { reviewSlice } from '../client/src/slices/reviewSlice.jsx';
import { questionsSlice } from '../client/src/slices/questionSlice.jsx';

const wrapTestWithProvider = (preloadedState = {}) => {

  let testStore = configureStore({
    reducer: {
      product: productSlice.reducer,
      relatedItems: comparisonSlice.reducer,
      questions: questionsSlice.reducer,
      reviews: reviewSlice.reducer
    },
    preloadedState,
  })

  return testStore
}

export default wrapTestWithProvider
