import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import Outfit from '../client/src/components/comparison/Outfit.jsx';
import Card from '../client/src/components/comparison/Card.jsx';
import RelatedItems from '../client/src/components/comparison/RelatedItems.jsx';
import { useSelector, useDispatch, Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore from 'redux-mock-store';
import { relatedItemsStub, productStub } from './stubs/comparisonStub.js';
import wrapTestWithProvider from './testStore.js';
// import { productSlice } from '../client/src/slices/productSlice.jsx';
// import { comparisonSlice } from '../client/src/slices/comparisonSlice.jsx';
// import { reviewSlice } from '../client/src/slices/reviewSlice.jsx';
// import { questionsSlice } from '../client/src/slices/questionSlice.jsx';
import thunk from 'redux-thunk'

const product = {
  id: 40345,
  campus: "hr-rfp",
  name: "Bright Future Sunglasses",
  slogan: "You've got to wear shades",
  description: "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
  category: "Accessories",
  default_price: "69.00",
  created_at: "2021-08-13T14:38:44.509Z",
  updated_at: "2021-08-13T14:38:44.509Z",
  features: [
      {
          "feature": "Lenses",
          "value": "Ultrasheen"
      },
      {
          "feature": "UV Protection",
          "value": null
      },
      {
          "feature": "Frames",
          "value": "LightCompose"
      }
  ],
  productStyles: [{style_id:240536,
    name: "Zebra Stripe",
    original_price: "900.00",
    sale_price: null,
    photos: [{thumbnail_url: "https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
              url: "https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"}]
            }],
  productRatings: {
    1: 2,
    2: 3,
    3: 4,
    4: 5,
    5: 6
  }
}

const initialState = {
  product: {
    id: 40344,
    productInformation: {
      id: 40344,
      campus: 'hr-rfp',
      name: 'Camo Onesie',
      slogan: 'Blend in to your crowd',
      description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
      category: 'Jackets',
      default_price: '140.00',
      created_at: '2021-08-13T14:38:44.509Z',
      updated_at: '2021-08-13T14:38:44.509Z',
      features: [
        {
          feature: 'Fabric',
          value: 'Canvas'
        },
        {
          feature: 'Buttons',
          value: 'Brass'
        }
      ]
    },
    availableStyles: []
  }
}


describe('summation test test', () => {
  test('adds 1 + 1 to equal 2', () => {
    expect((() => 1+1)()).toBe(2);
  });
})

describe('Outfit component', () => {
  const outfit = {
    id: 1,
    productStyles: [
      {
        photos: [
          { url: 'https://example.com/image1.jpg' },
          { url: 'https://example.com/image2.jpg' },
        ],
      },
    ],
    outfitRatings: {
      1: 2,
      2: 3,
      3: 4,
      4: 5,
      5: 6,
    },
    category: 'Clothing',
    name: 'T-shirt',
    default_price: 19.99,
  };

  let store;
  beforeEach(() => {
    const mockStore = configureMockStore();
    store = mockStore({
      relatedItems: {
        outfits: [],
      },
    });
  });

  it('renders the Outfit component without errors', () => {
    render(
      <Provider store={store}>
        <Outfit outfit={outfit} index={0} />
      </Provider>
    );
  });

  it('renders outfit details correctly', () => {

    const { getByText, getByAltText } = render(
      <Provider store={store}>
        <Outfit outfit={outfit} index={0} />
      </Provider>
    );

    const categoryElement = getByText('Clothing');
    expect(categoryElement).toBeInTheDocument();

    const nameElement = getByText('T-shirt');
    expect(nameElement).toBeInTheDocument();

    const imageElement = getByAltText('Product Image');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).toBe('https://example.com/image1.jpg');
  });


  it('displays the outfit image with the correct source', () => {

    const { getByAltText } = render(
      <Provider store={store}>
        <Outfit outfit={outfit} index={0} />
      </Provider>
    );

    const imageElement = getByAltText('Product Image');
    expect(imageElement.src).toBe('https://example.com/image1.jpg');
  });

});


describe('Card', () => {
  let store;
  beforeEach(() => {
    const mockStore = configureMockStore();
    store = mockStore(initialState)
  });

  it('renders the card', () => {
    render(
      <Provider store={store}>
        <Card product={product} index={0} />
      </Provider>
    );
  });

  it('renders the card with category, name, and price', () => {
    render(
      <Provider store={store}>
        <Card product={product} index={0} />
      </Provider>
    );

    const categoryElement = screen.getByTestId('category');
    const nameElement = screen.getByTestId('name');
    const priceElement = screen.getByText(`$${product.default_price}`);

    expect(categoryElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
  });

  it('renders the card with image', () => {
    render(
      <Provider store={store}>
        <Card product={product} index={0} />
      </Provider>
    );

    const imageElement = screen.getByAltText('Product Image');
    expect(imageElement).toBeInTheDocument();
  });
})

describe('RelatedItems component', () => {
  let store;

  beforeEach(() => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    store = mockStore({
      product: {
        id: 40344,
        productInformation: {
          id: 40344,
          campus: "hr-rfp",
          name: "Camo Onesie",
          slogan: "Blend in to your crowd",
          description: "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
          category: "Jackets",
          default_price: "140.00",
          created_at: "2021-08-13T14:38:44.509Z",
          updated_at: "2021-08-13T14:38:44.509Z",
          features: [
              {
                  "feature": "Fabric",
                  "value": "Canvas"
              },
              {
                  "feature": "Buttons",
                  "value": "Brass"
              }
            ]
          },
          availableStyles: [{}],
        },
      relatedItems: {
        relatedIds: [
          40345,
          40346,
          40351,
          40350
        ],
        relatedProducts: [{
          id: 40345,
          campus: "hr-rfp",
          name: "Bright Future Sunglasses",
          slogan: "You've got to wear shades",
          description: "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
          category: "Accessories",
          default_price: "69.00",
          created_at: "2021-08-13T14:38:44.509Z",
          updated_at: "2021-08-13T14:38:44.509Z",
          features: [
              {
                  "feature": "Lenses",
                  "value": "Ultrasheen"
              },
              {
                  "feature": "UV Protection",
                  "value": null
              },
              {
                  "feature": "Frames",
                  "value": "LightCompose"
              }
          ],
          productStyles: [{style_id:240536,
            name: "Zebra Stripe",
            original_price: "900.00",
            sale_price: null,
            photos: [{thumbnail_url: "https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                      url: "https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"}]
                    }],
          productRatings: {
            1: 2,
            2: 3,
            3: 4,
            4: 5,
            5: 6
          }
        }],
        outfits: [{
          id: 40347,
          campus: 'hr-rfp',
          name: 'Slacker\'s Slacks',
          slogan: 'Comfortable for everything, or nothing',
          description: 'I\'ll tell you how great they are after I nap for a bit.',
          category: 'Pants',
          default_price: '65.00',
          created_at: '2021-08-13T14:38:44.509Z',
          updated_at: '2021-08-13T14:38:44.509Z',
          features: [
            {
              feature: 'Fabric',
              value: '99% Cotton 1% Elastic'
            },
            {
              feature: 'Cut',
              value: 'Loose'
            }
          ],
          productStyles: [{
            style_id: 240516,
            name: 'Black',
            original_price: '65.00',
            sale_price: null,
            photos: [{
              thumbnail_url: 'https://images.unsplash.com/photo-1554260570-9140fd3b7614?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
              url: 'https://images.unsplash.com/photo-1554260570-9140fd3b7614?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
            }]
          }],
          outfitRatings: {
            '1': '5',
            '2': '3',
            '3': '81',
            '4': '22',
            '5': '12'
          }
        }]
      }
    })
  });

  it('renders the RelatedItems component without errors', () => {
    render(
      <Provider store={store}>
        <RelatedItems />
      </Provider>
    );
  });

  it('renders the "Your Outfits" section', () => {

    const { getByText } = render(
    <Provider store={store}>
      <RelatedItems />
    </Provider>);

    // Assert
    expect(getByText('Your Outfits')).toBeInTheDocument();
  });

});

