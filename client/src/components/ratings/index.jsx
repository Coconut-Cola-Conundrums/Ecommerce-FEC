import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getReviews, getMetaData} from '../../slices/reviewSlice.jsx'
import {NewRev} from './rating_components/new_rev.jsx';
import {ProductBreakdown} from './rating_components/product_breakdown.jsx';
import {RatingBreakdown} from './rating_components/rating_breakdown.jsx';
import {RevList} from './rating_components/rev_list.jsx';
import {SortOptions} from './rating_components/sort_options.jsx';


const Reviews = () => {
  const product = useSelector(state => state.product);
  const reviewState = useSelector(state => state.reviews);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('review running')
    if (product.id) {
      dispatch(getReviews(product.id))
      .then(dispatch(getMetaData(product.id)))
      .then(() => {
        // console.log('This is reviewState =====>', reviewState)
      }).catch((err) => {console.log(err)})

    }
  }, [product.id])

  useEffect(() => {
    console.log(reviewState)
  }, [reviewState]);

// on render set initial state with the current product ID.

  return (
    <div>
      <div className = 'revList'><RevList summary = {reviewState.reviews}/></div>
      <div className = 'sortOptions'><SortOptions/></div>
      <div className = 'ratingBreakdown'><RatingBreakdown ratings = {reviewState.ratings}/></div>
      <div className = 'productBreakdown'><ProductBreakdown characteristics = {reviewState.characteristics}/></div>
      <div className = 'newRev'><NewRev/></div>
    </div>
  )
}
export default Reviews;