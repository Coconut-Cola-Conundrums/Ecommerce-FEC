import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Stars} from './stars.jsx'


export const ProductBreakdown = () => {
  const characteristics = useSelector(state => state.reviews.characteristics);

  console.log('please show up: ', characteristics);
  if (characteristics.Comfort){
  // console.log(characteristics);
  }
  if (characteristics.Comfort) {
  return (
    <div>
      <h1>Product Breakdown</h1>

      <div>Comfort<Stars rating = {characteristics.Comfort.value}/></div>
      <div>Fit<Stars rating = {characteristics.Fit.value}/></div>
      <div>Length<Stars rating = {characteristics.Length.value}/></div>
      <div>Quality<Stars rating = {characteristics.Quality.value}/></div>

    </div>
  )
  } else{
    return <h1>Product Breakdown</h1>
  }
}