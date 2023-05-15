import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import wrapTestWithProvider from './testStore.js';
import  ProductDescription  from '../client/src/components/overview/productDescription';
import '@testing-library/jest-dom/extend-expect';


describe('testing if async works', () => {
  test('works?', () => {
    let preloadedState = {product: {
      id: 40344,
      productInformation: {
        "id": 40344,
        "campus": "hr-rfp",
        "name": "Camo Onesie",
        "slogan": "Blend in to your crowd",
        "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
        "category": "Jackets",
        "default_price": "140.00",
        "created_at": "2021-08-13T14:38:44.509Z",
        "updated_at": "2021-08-13T14:38:44.509Z",
        "features": [
            {
                "feature": "Fabric",
                "value": "Canvas"
            },
            {
                "feature": "Buttons",
                "value": "Brass"
            }
        ]
    }
    }};
    const testStore = wrapTestWithProvider(preloadedState);
    render (
      <Provider store={testStore}>
        <ProductDescription/>
      </Provider>
    )

    const a = screen.queryByText("Blend in to your crowd");
    console.log(a);
    // expect(screen.queryByText("Blend in to your crowd")).toBeInTheDocument();
  });

});
// test("reducer gets products and sets first object's id to the id in the product state", async() => {
//   expect(productSlice.reducer(getInitialData())).toEqual({
//     id: 40344,
//     productInformation: {

//     },
//     availableStyles: [

//     ],
//     currentStyle: {

//     },
//     isError: false,
//     errorMessage: '',
//     isLoading: false,
//   })
// })