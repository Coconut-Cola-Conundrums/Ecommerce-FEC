import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { comparisonSlice } from '../../slices/comparisonSlice';
import { removeOutfit } from './outfitStorage.js';
import {Stars} from '../ratings/rating_components/stars.jsx';

export const useAppDispatch = useDispatch


const Outfit = ({ outfit }) => {
  const dispatch = useAppDispatch()

  const handleXclick = () => {
    dispatch(comparisonSlice.actions.removeOutfit(outfit.id)); //removes from state
    removeOutfit(); //removes from local storage
  };

  if (outfit.productStyles && outfit.outfitRatings) {
    const one = Number(outfit.outfitRatings[1]);
    const two = Number(outfit.outfitRatings[2]);
    const three = Number(outfit.outfitRatings[3]);
    const four = Number(outfit.outfitRatings[4]);
    const five = Number(outfit.outfitRatings[5]);
    const numerator = 1 * one + 2 * two + 3 * three + 4 * four + 5 * five;
    const denominator = one + two + three + four + five;

    const average = numerator / denominator;
    const fixedAvg = average.toFixed(2);

    return (
      <div className="relatedItemCard">
        <i className="fa-sharp fa-solid fa-circle-xmark" onClick={handleXclick}></i>
        <div className="imageContainer">
          <img
            className="sampleImage"
            src={outfit.productStyles[0].photos[0].url}
            alt="Product Image"
          />
        </div>
        <div>{outfit.category}</div>
        <div>
          <strong>{outfit.name}</strong>
        </div>
        <div>
          <small>${outfit.default_price}</small>
        </div>
        <div><Stars rating={fixedAvg}/></div>
      </div>
    )
  } else {
    return (<div></div>)
  }

}

export default Outfit;