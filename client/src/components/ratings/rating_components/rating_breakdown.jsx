import React, {useState, useEffect} from 'react';
import {Stars} from './stars.jsx';
import ProgressBar from "@ramonak/react-progress-bar";
import {useSelector, useDispatch} from 'react-redux';
import {reducers} from '../../../slices/reviewSlice.jsx'
import StarImage from '../Images/icons8-star-24.png'

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
  // var max = Math.max(one, two, three, four, five)
  var total = one + two + three + four + five
  // var percentOne = ((one/total)*100).toFixed(0);

  var average = (numerator/denominator);
  var fixedAvg = average;

  var handleClick = (rating) => {
    // console.log('1star clicked')
    var filteredReviews = reviews.filter((review) => {
      return rating === review.rating;
    })
    dispatch(reducers.updateReviews(filteredReviews));
  }
  const starObj = <img src = {StarImage} width = "15"/>
  return (
    <div data-testid="rating-breakdown-div">
      <h1>Rating Breakdown</h1>
      <h2>Average Rating   {(fixedAvg).toFixed(1)}</h2>
      <div><Stars rating = {(fixedAvg).toFixed(2)}/></div>
      <div id = 'ratingBars'>
        <div id = 'ratingElement' onClick = {() => {handleClick(1)}}>
          <label>{starObj} {Number(((one/total)*100).toFixed(0))}%
          </label>
          {<ProgressBar borderRadius = '5px' className = 'ratingBar' height = '10px' bgColor="black" labelColor = 'black' completed={Number(((one/total)*100).toFixed(0))}/>}
        </div>
        <div id = 'ratingElement' onClick = {() => {handleClick(2)}}>
        <label>{starObj} {starObj} {Number(((two/total)*100).toFixed(0))}%
          </label>
          {<ProgressBar borderRadius = '5px' className = 'ratingBar' height = '10px' bgColor="black" labelColor = 'black' completed={Number(((two/total)*100).toFixed(0))}/>}
        </div>
        <div id = 'ratingElement' onClick = {() => {handleClick(3)}}>
        <label>{starObj} {starObj} {starObj} {Number(((three/total)*100).toFixed(0))}%
          </label>
          {<ProgressBar borderRadius = '5px' className = 'ratingBar' height = '10px' bgColor="black" labelColor = 'black' completed={Number(((three/total)*100).toFixed(0))}/>}
        </div>
        <div id = 'ratingElement' onClick = {() => {handleClick(4)}}>
        <label>{starObj} {starObj} {starObj} {starObj}{Number(((four/total)*100).toFixed(0))}%
          </label>
          {<ProgressBar borderRadius = '5px' className = 'ratingBar' height = '10px' bgColor="black" labelColor = 'black' completed={Number(((four/total)*100).toFixed(0))}/>}
        </div>
        <div id = 'ratingElement' onClick = {() => {handleClick(5)}}>
        <label> {starObj} {starObj} {starObj} {starObj} {starObj} {Number(((five/total)*100).toFixed(0))}%
          </label>
          {<ProgressBar borderRadius = '5px' className = 'ratingBar' height = '10px' bgColor="black" labelColor = 'black' completed={Number(((five/total)*100).toFixed(0))}/>}
        </div>
        </div>
    </div>
  )
}
