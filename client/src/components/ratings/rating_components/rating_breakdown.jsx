import React, {useState, useEffect} from 'react';
import {Stars} from './stars.jsx';


export const RatingBreakdown = ({ratings}) => {
  const one = Number(ratings[1]);
  const two = Number(ratings[2]);
  const three = Number(ratings[3]);
  const four = Number(ratings[4]);
  const five = Number(ratings[5]);
  const numerator = (1*one + 2*two + 3*three + 4*four + 5*five);
  const denominator = one + two + three + four + five;

  var average = (numerator/denominator);
  var fixedAvg = average;
  return (
    <div>
      <h1>Rating Breakdown</h1>
      <h2>Average Rating = {(fixedAvg).toFixed(2)}</h2>
      <div><Stars rating = {(fixedAvg).toFixed(2)}/></div>
      <p>1 Star- {one}</p>
      <p>2 Star-{two}</p>
      <p>3 Star-{three}</p>
      <p>4 Star-{four}</p>
      <p>5 Star-{five}</p>
    </div>
  )
}
