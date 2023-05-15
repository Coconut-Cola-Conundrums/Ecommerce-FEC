import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Outfit from '../client/src/components/comparison/Outfit.jsx';
// import Card from '../client/src/components/comparison/Card.jsx';
// import RelatedItems from '../client/src/components/comparison/RelatedItems.jsx'
import { useSelector, useDispatch, Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';


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
    const mockStore = configureStore();
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

  // it('calls handleXclick when X button is clicked', () => {
  //   const mockStore = configureStore();
  //   const store = mockStore({
  //     relatedItems: {
  //       outfits: [],
  //     },
  //   });

  //   const handleXclick = jest.fn();
  //   const { getByTestId } = render(
  //     <Provider store={store}>
  //       <Outfit outfit={outfit} index={0} handleXclick={handleXclick} />
  //     </Provider>
  //   );

  //   const xButton = getByTestId('x-button');
  //   fireEvent.click(xButton);
  //   expect(handleXclick).toHaveBeenCalledTimes(1);
  //   expect(handleXclick).toHaveBeenCalledWith(0);
  // });

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

// describe('Card component', () => {
//   const product = {
//     id: 1,
//     productStyles: [
//       {
//         photos: [
//           { url: 'https://example.com/image1.jpg' },
//           { url: 'https://example.com/image2.jpg' },
//         ],
//       },
//     ],
//     outfitRatings: {
//       1: 2,
//       2: 3,
//       3: 4,
//       4: 5,
//       5: 6,
//     },
//     category: 'Clothing',
//     name: 'T-shirt',
//     default_price: 19.99,
//   };

//   let store;
//   beforeEach(() => {
//     const mockStore = configureStore();
//     store = mockStore({
//       relatedItems: {
//         outfits: [],
//       },
//     });
//   });

//   it('renders the card with product details', () => {
//     const { getByText, getByAltText } = render(
//       <Provider store={store}>
//        <Outfit Card product={product} />
//       </Provider>
//     );

//     // Add your assertions here to ensure the component renders correctly
//     const categoryElement = getByText('Clothing');
//     expect(categoryElement).toBeInTheDocument();

//     const nameElement = getByText('T-shirt');
//     expect(nameElement).toBeInTheDocument();

//     const imageElement = getByAltText('Product Image');
//     expect(imageElement).toBeInTheDocument();
//     expect(imageElement.src).toBe('https://example.com/image1.jpg');

//     // Add more assertions for other elements and data in the card
//   });

//   // it('renders the card with default image if product image is not available', () => {
//   //   const productWithoutImage = {
//   //     // ... product data without image ...
//   //   };

//   //   const { getByAltText } = render(<Card product={productWithoutImage} />);

//   //   const defaultImageElement = getByAltText('Product Image');
//   //   expect(defaultImageElement.src).toBe('https://www.warnersstellian.com/Content/images/product_image_not_available.png');
//   // });

//   // Add more test cases to cover other rendering scenarios

// });

// describe('RelatedItems component', () => {
//   const mockRelatedItems = {
//     relatedIds: [1, 2, 3], // Mocked array of related product IDs
//     relatedProducts: [
//       {
//         id: 1,
//         name: 'Related Product 1',
//         default_price: 19.99,
//         category: 'Clothing',
//       },
//       {
//         id: 2,
//         name: 'Related Product 2',
//         default_price: 20.99,
//         category: 'Pants',
//       },
//       {
//         id: 3,
//         name: 'Related Product 3',
//         default_price: 21.99,
//         category: 'Shirt',
//       },
//     ],
//     outfits: [
//       {
//         id: 4,
//         name: 'Outfit 1',
//         default_price: 22.99,
//         category: 'Shoes',
//       },
//       {
//         id: 5,
//         name: 'Outfit 2',
//         default_price: 23.99,
//         category: 'Glassses',
//       },
//     ],
//   };


//   let store;
//   beforeEach(() => {
//     const mockStore = configureStore();
//     store = mockStore({
//       relatedItems: mockRelatedItems,
//       product: {
//         id: 1,
//         name: 'T-shirt',
//         price: 19.99,
//         category: 'Clothing',
//         image: 'https://example.com/image1.jpg',
//       },
//     });
//   });

//   it('renders the related product card with product details', () => {
//     const { getByText, getByAltText } = render(
//       <Provider store={store}>
//         <RelatedItems />
//       </Provider>
//     );

//     const categoryElement = getByText('Clothing');
//     expect(categoryElement).toBeInTheDocument();

//     const nameElement = getByText('Related Product 1');
//     expect(nameElement).toBeInTheDocument();

//     const priceElement = getByText('$19.99');
//     expect(priceElement).toBeInTheDocument();

//     const imageElement = getByAltText('Product Image');
//     expect(imageElement).toBeInTheDocument();
//     expect(imageElement.src).toBe('https://example.com/image1.jpg');
//   });
// });