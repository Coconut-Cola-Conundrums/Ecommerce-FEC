import React, {useState, useEffect} from 'react';


export const RatingBreakdown = ({ratings}) => {
  const one = ratings[1];
  const two = ratings[2];
  const three = ratings[3];
  const four = ratings[4];
  const five = ratings[5];
  var average = ((1*one + 2*two + 3*three + 4*four + 5*five)/(one + two + three + four + five));
  var fixedAvg = average;
  return (
    <div>
      <h1>Rating Breakdown</h1>
      <h2>Averate Rating = {fixedAvg}</h2>
      <p>1 {one}</p>
      <p>2 {two}</p>
      <p>3 {three}</p>
      <p>4 {four}</p>
      <p>5 {five}</p>
    </div>
  )
}