import {render, screen} from '@testing-library/react';
import productSlice, { getInitialData } from '../src/slices/productSlice.jsx';

test("reducer gets products and sets first object's id to the id in the product state", async() => {
  expect(productSlice.reducer(getInitialData())).toEqual({
    id: 40344,
    productInformation: {

    },
    availableStyles: [

    ],
    currentStyle: {

    },
    isError: false,
    errorMessage: '',
    isLoading: false,
  })
})