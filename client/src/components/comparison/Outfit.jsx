import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { comparisonSlice } from '../../slices/comparisonSlice';
import { saveOutfits } from './outfitStorage.js';
import {Stars} from '../ratings/rating_components/stars.jsx';

const Outfit = ({ outfit, index }) => {
  const dispatch = useDispatch();
  let comparisonState = useSelector((state) => state.relatedItems)

  const handleXclick = (index) => {
    const updatedOutfits = [...comparisonState.outfits];
    updatedOutfits.splice(index, 1); // Remove the element at the specified index
    saveOutfits(updatedOutfits);
    dispatch(comparisonSlice.actions.removeOutfit(outfit.id)); //removes from state
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
      <div className="individualCard">
        <i className="fa-sharp fa-solid fa-x" onClick={() => handleXclick(index)}></i>
        <div className="imageContainer">
          <img
            className="sampleImage"
            src={outfit.productStyles[0].photos[0].url || 'https://www.warnersstellian.com/Content/images/product_image_not_available.png'}
            alt="Product Image"
          />
        </div>
        <div>{outfit.category}</div>
        <div>
          <strong>{outfit.name}</strong>
        </div>
        <div>
          <div>${outfit.default_price}</div>
        </div>
        <div><Stars rating={fixedAvg}/></div>
      </div>
    )
  } else {
    return (<div></div>)
  }

}

export default Outfit;