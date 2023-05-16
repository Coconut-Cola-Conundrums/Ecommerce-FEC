//call to the getinitial data function to check the correct data is being retrieved with a given id
//check if the initial state is updated
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
// import Reviews from '../client/src/components/ratings/index.jsx';
import {RatingBreakdown} from '../client/src/components/ratings/rating_components/rating_breakdown.jsx';
import {RevList} from '../client/src/components/ratings/rating_components/rev_list.jsx';
import {ProductBreakdown} from '../client/src/components/ratings/rating_components/product_breakdown.jsx'
import {SortOptions} from '../client/src/components/ratings/rating_components/sort_options.jsx'
import {NewRev} from '../client/src/components/ratings/rating_components/new_rev.jsx'
// import {Stars} from '../client/src/components/ratings/rating_components/stars.jsx';
// const Reviews = require('../client/src/components/ratings/index.jsx');
import { useSelector, useDispatch, Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import axios from 'axios';

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
      product: {
        id: 1
      },
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
    screen.logTestingPlaygroundURL()
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
  //tests if the helpful axios put request works
  it('should check if the axios put was called', async () => {
    const id = 1279687;
    const mockAxiosPut = jest.spyOn(axios, 'put').mockResolvedValueOnce();
    const { getByTestId } = render(
      <Provider store = {store}>
        <RevList></RevList>
      </Provider>
    );
    fireEvent.click(getByTestId(`helpful${id}`));
    expect(mockAxiosPut).toHaveBeenCalledTimes(1);
  })

    //tests if the Report axios put request works
    it('should check if the axios put was called', async () => {
      const id = 1279687;
      const mockAxiosPut = jest.spyOn(axios, 'put').mockResolvedValueOnce();
      const { getByTestId } = render(
        <Provider store = {store}>
          <RevList></RevList>
        </Provider>
      );
      fireEvent.click(getByTestId(`report${id}`));
      expect(mockAxiosPut).toHaveBeenCalledTimes(2);
    })

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

  //testing SortOptions renders
  it('should render sortOptions', () => {
    const {getByTestId} = render(
      <Provider store = {store}>
        <SortOptions/>
      </Provider>
    )
    const divElement = getByTestId("sortTest");
    expect(divElement).toBeInTheDocument();
  })
  //testing New Review Submition
  it('Should Submit a new Review', () => {
    const mockAxiosPost = jest.spyOn(axios, 'post').mockResolvedValueOnce();
    const {getByTestId} = render(
      <Provider store = {store}>
        <NewRev/>
      </Provider>
    )
    fireEvent.click(getByTestId('newRev'));
    fireEvent.click(getByTestId('submitTest'));
    expect(mockAxiosPost).toHaveBeenCalledTimes(1);
  })
});