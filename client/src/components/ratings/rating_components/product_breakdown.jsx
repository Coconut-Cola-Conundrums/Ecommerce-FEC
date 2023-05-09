import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Stars} from './stars.jsx'


export const ProductBreakdown = () => {
  const characteristics = useSelector(state => state.reviews.characteristics);
  if (characteristics.Comfort){
  console.log(characteristics);
  }
  if (characteristics.Comfort) {
  return (
    <div>
      <h1>Product Breakdown</h1>

      <p>Comfort<Stars rating = {characteristics.Comfort.value}/></p>
      <p>Fit<Stars rating = {characteristics.Fit.value}/></p>
      <p>Length<Stars rating = {characteristics.Length.value}/></p>
      <p>Quality<Stars rating = {characteristics.Quality.value}/></p>

    </div>
  )
  } else{
    return <h1>Product Breakdown</h1>
  }
}