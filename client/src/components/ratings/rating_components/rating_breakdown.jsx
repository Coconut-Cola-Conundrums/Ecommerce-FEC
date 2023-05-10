import React, {useState, useEffect} from 'react';
import {Stars} from './stars.jsx';
import ProgressBar from "@ramonak/react-progress-bar";

export const RatingBreakdown = ({ratings}) => {
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
  return (
    <div>
      <h1>Rating Breakdown</h1>
      <h2>Average Rating = {(fixedAvg).toFixed(2)}</h2>
      <div><Stars rating = {(fixedAvg).toFixed(2)}/></div>
      <div>1 Star- {<ProgressBar className = 'ratingBar' completed={((one/max)*100).toFixed(0)}/>}</div>
      <div>2 Star-{<ProgressBar  className = 'ratingBar' completed={((two/max)*100).toFixed(0)}/>}</div>
      <div>3 Star-{<ProgressBar  className = 'ratingBar' completed={((three/max)*100).toFixed(0)}/>}</div>
      <div>4 Star-{<ProgressBar  className = 'ratingBar' completed={((four/max)*100).toFixed(0)}/>}</div>
      <div>5 Star-{<ProgressBar  className = 'ratingBar' completed={((five/max)*100).toFixed(0)}/>}</div>
    </div>
  )
}
