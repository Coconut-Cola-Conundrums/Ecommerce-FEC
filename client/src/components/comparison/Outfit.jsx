import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { comparisonSlice } from '../../slices/comparisonSlice';
import { removeOutfit } from './outfitStorage.js';

const Outfit = ({ outfit }) => {
  const dispatch = useDispatch();

  const handleXclick = () => {
    dispatch(comparisonSlice.actions.removeOutfit(outfit.id)); //removes from state
    removeOutfit(); //removes from local storage
  };

  if (outfit.productStyles) {
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
        <div>Product Ratings...</div>
      </div>
    )
  } else {
    return (<div></div>)
  }

}

export default Outfit;