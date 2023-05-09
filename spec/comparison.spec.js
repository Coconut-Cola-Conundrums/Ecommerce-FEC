import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import RelatedItems from '../client/src/components/comparison/RelatedItems';

const mockStore = configureStore([]);

describe('RelatedItems', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      relatedItems: {
        outfits: [],
        relatedIds: [],
        relatedProducts: [],
      },
      product: {
        id: '123',
      },
    });
  });

  it('renders "Related Products" heading', () => {
    render(
      <Provider store={store}>
        <RelatedItems />
      </Provider>
    );

    expect(screen.getByText('Related Products')).toBeInTheDocument();
  });
});
