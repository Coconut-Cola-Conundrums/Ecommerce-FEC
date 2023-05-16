import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import  userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux'
import wrapTestWithProvider from './testStore.js';
import  ProductDescription  from '../client/src/components/overview/productDescription';
import StyleSelector from '../client/src/components/overview/StyleSelector';
import { productStub, styleStub } from './stubs/productOverviewStubs.js';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup)

const initialState = {
  id: null,
  productInformation: {

  },
  availableStyles: [

  ],
  currentStyle: {

  },
  isError: false,
  errorMessage: '',
  isLoading: false,
  successMessage: '',
};

describe('Product Description Section', () => {
  test('Component accesses state and displays product information', async() => {

    let productState = {...initialState, ...productStub};

    const testStore = wrapTestWithProvider({product: productState});

    render (
      <Provider store={testStore}>
        <ProductDescription/>
      </Provider>
    )

    expect(await screen.queryByText("Blend in to your crowd")).toBeInTheDocument();

    expect(await screen.queryAllByTestId("feature").length).toEqual(2);
  });

});

describe('Style Selector Section', () => {
  test('Clicking new style updates the current style element' , async() => {
    // mock user clicking onClickStyle which updates style
    let productState = {...initialState, ...productStub, ...styleStub, currentStyle: styleStub.availableStyles[0]};

    const testStore = wrapTestWithProvider({product: productState});

    render (
      <Provider store={testStore}>
        <StyleSelector />
      </Provider>
    )

    const user = userEvent.setup();
    user.click(screen.queryAllByTestId("unselectedStyle")[3])
    .then(() => expect(screen.queryAllByTestId("unselectedStyle")[3]).toHaveClass("selectedStyleElement"))
  })
})
