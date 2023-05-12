import React, {useState, useEffect} from 'react';
import {Stars} from './stars.jsx';
import ProgressBar from "@ramonak/react-progress-bar";
import {useSelector, useDispatch} from 'react-redux';
import {reducers} from '../../../slices/reviewSlice.jsx'

export const RatingBreakdown = ({ratings}) => {

  const reviews = useSelector(state => state.reviews.allReviews);
  const dispatch = useDispatch();

  const one = Number(ratings[1]);
  const two = Number(ratings[2]);
  const three = Number(ratings[3]);
  const four = Number(ratings[4]);
  const five = Number(ratings[5]);
  const numerator = (1*one + 2*two + 3*three + 4*four + 5*five);
  const denominator = one + two + three + four + five;
  var max = Math.max(one, two, three, four, five)

  var average = (numerator/denominator);
  var fixedAvg = average;

  var handleClick = (rating) => {
    console.log('1star clicked')
    var filteredReviews = reviews.filter((review) => {
      return rating === review.rating;
    })
    dispatch(reducers.updateReviews(filteredReviews));
  }

  return (
    <div data-testid="rating-breakdown-div">
      <h1>Rating Breakdown</h1>
      <h2>Average Rating = {(fixedAvg).toFixed(2)}</h2>
      <div><Stars rating = {(fixedAvg).toFixed(2)}/></div>
      <div onClick = {() => {handleClick(1)}}>1 Star- {<ProgressBar   className = 'ratingBar'  bgColor="#64B8B5" completed={((one/max)*100).toFixed(0)}/>}</div>
      <div onClick = {() => {handleClick(2)}}>2 Star-{<ProgressBar  className = 'ratingBar' bgColor="#64B8B5" completed={((two/max)*100).toFixed(0)}/>}</div>
      <div onClick = {() => {handleClick(3)}}>3 Star-{<ProgressBar  className = 'ratingBar' bgColor="#64B8B5" completed={((three/max)*100).toFixed(0)}/>}</div>
      <div onClick = {() => {handleClick(4)}}>4 Star-{<ProgressBar  className = 'ratingBar' bgColor="#64B8B5" completed={((four/max)*100).toFixed(0)}/>}</div>
      <div onClick = {() => {handleClick(5)}}>5 Star-{<ProgressBar  className = 'ratingBar' bgColor="#64B8B5" completed={((five/max)*100).toFixed(0)}/>}{five}</div>
    </div>
  )
}
