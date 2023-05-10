import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Stars} from './stars.jsx';
import ProgressBar from "@ramonak/react-progress-bar";





export const ProductBreakdown = () => {
  const characteristics = useSelector(state => state.reviews.characteristics);
  if (characteristics.Comfort){
  console.log(characteristics);
  }
  if (characteristics.Comfort) {
  return (
    <div>
      <h1>Product Breakdown</h1>
      <div id = 'comfort'>Comfort<ProgressBar  className = 'productBar' completed={(characteristics.Comfort.value/5*100).toFixed(0)}/></div>
      <div>Fit<ProgressBar className = 'productBar' completed={(characteristics.Fit.value/5*100).toFixed(0)}/></div>
      <div>Length<ProgressBar  className = 'productBar' completed={(characteristics.Length.value/5*100).toFixed(0)}/></div>
      <div>Quality<ProgressBar  className = 'productBar' completed={(characteristics.Quality.value/5*100).toFixed(0)}/></div>
    </div>
  )
  } else{
    return <h1>Product Breakdown</h1>
  }
}