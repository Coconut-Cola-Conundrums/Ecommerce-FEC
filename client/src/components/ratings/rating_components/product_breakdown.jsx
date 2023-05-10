import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Stars} from './stars.jsx';
import ProgressBar from "@ramonak/react-progress-bar";





export const ProductBreakdown = () => {
  const characteristics = useSelector(state => state.reviews.characteristics);

  console.log('please show up: ', characteristics);
  if (characteristics.Comfort){
  console.log(characteristics);
  }
  var keys = Object.keys(characteristics)
  return (
    <div>
      <h1>Product Breakdown</h1>
      <div>{keys.map((char) => {
        return <div key = {char}>
        {char}
        <ProgressBar  className = 'productBar' completed={(characteristics[char].value/5*100).toFixed(0)}/>
        </div>
      })}</div>
    </div>
  )
}