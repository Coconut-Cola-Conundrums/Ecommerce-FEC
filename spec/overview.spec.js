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

  test('Clicking new style updates the current style element in state and displays new style name' , async() => {
    // mock user clicking onClickStyle which updates style
    let productState = {...initialState, ...productStub, ...styleStub, currentStyle: styleStub.availableStyles[0]};

    const testStore = wrapTestWithProvider({product: productState});

    render (
      <Provider store={testStore}>
        <StyleSelector />
      </Provider>
    )

    let styleToClick = await screen.queryAllByAltText("styleElement")[3];

    const user = userEvent.setup();
    await user.click(styleToClick);
    // new selected style should be the third in the style element array
    screen.logTestingPlaygroundURL()
    expect(await screen.queryAllByAltText("styleElement")[3]).toHaveClass("selectedStyleElement");
    expect(await screen.getByText(/digital Red & Black/i)).toBeInTheDocument();


  })
})
