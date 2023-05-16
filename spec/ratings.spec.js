//call to the getinitial data function to check the correct data is being retrieved with a given id
//check if the initial state is updated
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
// import Reviews from '../client/src/components/ratings/index.jsx';
import {RatingBreakdown} from '../client/src/components/ratings/rating_components/rating_breakdown.jsx';
import {RevList} from '../client/src/components/ratings/rating_components/rev_list.jsx';
import {ProductBreakdown} from '../client/src/components/ratings/rating_components/product_breakdown.jsx'
// import {Stars} from '../client/src/components/ratings/rating_components/stars.jsx';
// const Reviews = require('../client/src/components/ratings/index.jsx');
import { useSelector, useDispatch, Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';

describe('summation test test', () => {
  test('adds 1 + 1 to equal 2', () => {
    expect((() => 1+1)()).toBe(2);
  });
})


describe('Ratings and Reviews', () => {
  const props = {
    ratings: {
      1: 2,
      2: 3,
      3: 4,
      4: 5,
      5: 6,
    }
  };

  let store;
  beforeEach(() => {
    const mockStore = configureStore();
    store = mockStore({
      reviews: {
        allReviews: [
          {
            review_id: 1279696,
            rating: 5,
            summary: "cool",
            recommend: true,
            response: null,
            body: "Style and quality is top notch. Will be buying more styles!",
            date: "2023-05-05T00:00:00.000Z",
            reviewer_name: "anon",
            helpfulness: 13,
            photos: []
        }
        ],
        reviews: [
          {
            review_id: 1279696,
            rating: 5,
            summary: "cool",
            recommend: true,
            response: null,
            body: "Style and quality is top notch. Will be buying more styles!",
            date: "2023-05-05T00:00:00.000Z",
            reviewer_name: "anon",
            helpfulness: 13,
            photos: []
          }
        ],
        characteristics: {
          Fit: {
              id: 135219,
              value: "3.2741935483870968"
          },
          Length: {
              id: 135220,
              value: "3.3130165289256198"
          },
          Comfort: {
              id: 135221,
              value: "3.3547334058759521"
          },
          Quality: {
              id: 135222,
              value: "3.3222698072805139"
          }
      }
      }

    })
  })

  //testing RatingBreakdown Render
  it('should render a populated div', () => {
    const { getByTestId } = render(
      <Provider store = {store}>
        <RatingBreakdown {...props}/>
      </Provider>)
    const divElement = getByTestId('rating-breakdown-div');
    expect(divElement).toBeInTheDocument();
  });
  //testing Review List Render
  it('should render list of reviews', () => {
    const {getByTestId} = render(
      <Provider store = {store}>
        <RevList></RevList>
      </Provider>
      )
      const divElement = getByTestId('review-list-div');
      expect(divElement).toBeInTheDocument();
  });
  //testing if product Breakdown renders
  it('should render product breakdown', () => {
    const {getByTestId} = render(
      <Provider store = {store}>
        <ProductBreakdown/>
      </Provider>
    )
    const divElement = getByTestId("product-breakdown-div");
    expect(divElement).toBeInTheDocument();
  })
});