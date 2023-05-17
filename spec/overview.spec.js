import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import  userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import wrapTestWithProvider from './testStore.js';
import ProductDescription from '../client/src/components/overview/productDescription';
import ProductDetails from '../client/src/components/overview/productDetails';
import StyleSelector from '../client/src/components/overview/styleSelector';
import AddToCart from  '../client/src/components/overview/addToCart';
import Modal from  '../client/src/components/overview/mainPhotoModal';
import ImageGallery from  '../client/src/components/overview/ImageGallery';
import { productStub, styleStub, yeezyProductStub, yeezyStyleStub } from './stubs/productOverviewStubs.js';
import { ratingsStub } from './stubs/ratingsStubs.js';
import { store } from '../client/src/store.jsx';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import '@testing-library/jest-dom/extend-expect';


// const handlers = [
//     rest.post('/cart', (req, res, ctx) => {
//     return res(ctx.send("Created"))
//   }),
// ]

// const server = setupServer(...handlers);

// beforeAll(() => server.listen());
// // beforeEach();

// afterEach(() => {
//   cleanup();
//   server.resetHandlers();
//   }
// )

// afterAll(() => server.close());

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

const initialReviewsState = {
  sort: 'newest',
  allReviews: [],
  reviews: [],
  ratings: '',
  recommended: '',
  characteristics: {}
}



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

    let styleToClick = await screen.queryAllByTestId("styleElement")[3];

    const user = userEvent.setup();
    await user.click(styleToClick);
    // new selected style should be the third in the style element array
    // screen.logTestingPlaygroundURL();
    expect(await screen.queryAllByTestId("styleElement")[3]).toHaveClass("selectedStyleElement");
    expect(await screen.getByText(/digital Red & Black/i)).toBeInTheDocument();
  });
})

describe('Product Details Section', () => {
  const preloadedState = {
    product:
      {...initialState, ...productStub, ...styleStub, currentStyle: styleStub.availableStyles[0]},
    reviews:
      {...initialReviewsState, ...ratingsStub}
  }

  const testStore = wrapTestWithProvider(preloadedState);

  test('correct category displays', async() => {
    render(
      <Provider store={testStore}>
        <ProductDetails />
      </Provider>
    )
    expect(await screen.queryByText(/Jackets/i)).toBeInTheDocument();
  }),

  test('user clicking on style element updates price', async() => {

    render(
      <Provider store={testStore}>
        <ProductDetails />
        <StyleSelector />
      </Provider>
    )

    let styleToClick = await screen.queryAllByTestId("styleElement")[5];

    const user = userEvent.setup();
    await user.click(styleToClick);

    expect(screen.getByText(/170/)).toBeInTheDocument();
  })
})


describe('Test Product Slice', () => {
  test('Should initially have empty state', () => {
    const state = store.getState().product;
    expect(state).toEqual(initialState);
  })
})

describe('Add to Cart', () => {
  const preloadedState = {
    product:
      {...initialState, ...productStub, ...styleStub, currentStyle: styleStub.availableStyles[0]},
    reviews:
      {...initialReviewsState, ...ratingsStub}
  }

  const testStore = wrapTestWithProvider(preloadedState);
  test('Clicking add to bag without selecting a size puts a message on page', async() => {
    render(
      <Provider store={testStore}>
        <AddToCart />
      </Provider>
    )

    const user = userEvent.setup();
    await user.click(screen.getByRole('button'));

    expect(await screen.queryByText(/Please select a size before adding to bag./)).toBeVisible();
  })

  // test('Clicking add to bag with size and quantity posts accurately', async() => {
  //   const {getByTestId} = await render(
  //     <Provider store={testStore}>
  //       <AddToCart />
  //     </Provider>
  //   )

  //   const user = userEvent.setup();
  //   screen.logTestingPlaygroundURL();
    // let options = screen.getByText('Select Size')
    // console.log(options);

    // const b = await screen.queryByPlaceholderText(/Select Size/);
    // const a = await screen.queryByLabelText(/M/);
    // fireEvent.change(options,1394771)
    // await user.click(options, {target: {value: 1394771 }});
    // await user.click(screen.getByRole('button')); // User clicks add to bag button
    // expect(await screen.queryByText(/Please select a size before adding to bag/i)).toBeInTheDocument();
    // const b = await screen.queryByTestId(/selectSize/i);
    // console.log(b);
    // await user.click(screen.queryByLabelText(/M/)); // User clicks sized M
    // const a = await screen.queryByLabelText(/M/)
    // console.log(a);
    // await user.click(screen.queryByPlaceholderText(/Select Size/));
    // await screen.queryByLabelText(/M/)
    // await user.click(screen.getByRole('button')); // User clicks add to bag button
    // const a = await screen.queryByRole("combobox");
    // console.log(a);
  //   fireEvent.change(getByTestId("select-size"), {target: {value: 2}});
  //   expect(screen.getByText("M")).toBeInTheDocument();
  //   expect(await screen.queryByText(/Added of Forest Green & Black in size M/i)).toBeInTheDocument();

  // })
})

describe('Image Gallery', () => {

  const preloadedState = {
    product:
      {...initialState, ...productStub, ...styleStub, currentStyle: styleStub.availableStyles[0]},
    reviews:
      {...initialReviewsState, ...ratingsStub}
  }

  const testStore = wrapTestWithProvider(preloadedState);

  test(('Should not show modal initially, but should show when user clicks on expand icon'), async() => {

    render (
      <Provider store={testStore}>
        <ImageGallery />
      </Provider>
    )
    const user = userEvent.setup();
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument(); // should not show initially
    await user.click(screen.getByTestId("expandIcon")); // opens modal
    expect(screen.getByTestId("modal")).toBeInTheDocument(); // modal should now be in view
  }),

  test(('When user clicks on a different thumbnail than the main photo, the selected thumbnail should become the main photo'), async() => {

    render (
      <Provider store={testStore}>
        <ImageGallery />
      </Provider>
    )

    const user = userEvent.setup();
    const allThumbnails = await screen.queryAllByTestId("thumbnailPhoto"); // all the thumbnails
    expect(await screen.queryByTestId("mainPhoto").alt).toEqual(allThumbnails[0].src); // initial photo should be the zeroth photo in the thumbnails
    await user.click(allThumbnails[3]); // user clicks the third photo
    expect(await screen.queryByTestId("mainPhoto").alt).toEqual(allThumbnails[3].src);
  }),

  test(('When user clicks on the right arrow, the main photo is updated to the next photo'), async() => {

    render (
      <Provider store={testStore}>
        <ImageGallery />
      </Provider>
    )

    const user = userEvent.setup();
    const allThumbnails = screen.getAllByTestId("thumbnailPhoto"); // all the thumbnails
    expect(screen.getByTestId("mainPhoto").alt).toEqual(allThumbnails[0].src); // initial photo should be the zeroth photo in the thumbnails
    await user.click(screen.getByTestId("rightArrow")); // user clicks the next photo
    expect(await screen.queryByTestId("mainPhoto").alt).toEqual(allThumbnails[1].src);
  }),

  test(('Should not have right arrow when on last photo'), async() => {
    render(
      <Provider store={testStore}>
        <ImageGallery />
      </Provider>
    )

    const user = userEvent.setup();
    const allThumbnails = screen.getAllByTestId("thumbnailPhoto"); // all the thumbnails
    expect(await screen.queryByTestId("leftArrow")).not.toBeInTheDocument(); // initially, right arrow but no left
    expect(screen.getByTestId("rightArrow")).toBeInTheDocument();
    await user.click(allThumbnails[5]); // user clicks the last photo
    expect(screen.getByTestId("leftArrow")).toBeInTheDocument(); // after changing to last photo, left photo but no right
    expect(await screen.queryByTestId("rightArrow")).not.toBeInTheDocument();
  }),

  test(('Should render out further thumbnails when up/down arrows clicked'), async() => {
    let yeezyState = {
      product:
        {...initialState, ...yeezyProductStub, ...yeezyStyleStub, currentStyle: yeezyStyleStub.availableStyles[0]},
      reviews:
        {...initialReviewsState, ...ratingsStub}
    }

    let yeezyStore = wrapTestWithProvider(yeezyState);

  })
})
