import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import wrapTestWithProvider from './testStore.js';
import  ProductDescription  from '../client/src/components/overview/productDescription';
import { productStub } from './stubs/productOverviewStubs.js';
import '@testing-library/jest-dom/extend-expect';


describe('Product Description Section', () => {
  test('Component accesses state and displays product information', async() => {
    let preloadedState = productStub;

    const testStore = wrapTestWithProvider(preloadedState);

    render (
      <Provider store={testStore}>
        <ProductDescription/>
      </Provider>
    )

    expect(await screen.queryByText("Blend in to your crowd")).toBeInTheDocument();

    expect(await screen.queryAllByTestId("feature").length).toEqual(2);
  });

});
