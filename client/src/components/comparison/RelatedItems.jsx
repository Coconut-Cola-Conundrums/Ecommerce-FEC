import React from "react";
// import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { getRelatedIds, getRelatedProduct} from '../slices/comparisonSlice.jsx'; //import getProductStyles
import { useEffect } from 'react'
import Card from './Cards.jsx';

//need to pass in ID from jac's state, not in store yet
const RelatedItems = () => {

  const dispatch = useDispatch();
  let relatedProducts = useSelector((state) => state.relatedItems.relatedProducts)
  //make another useSelector to select styles State

  //everytime the id changes, we will get use the newID to dispatch the 2 async thunks to update our relatedProducts
  useEffect(() => {
    dispatch(getRelatedIds(id))
    .then((action) => {
      const relatedIds = action.payload;
      relatedIds.forEach((id) => {
        dispatch(getRelatedProduct(id));
        //no need to update relatedProducts state here, it's being done in extraReducers once fullfilled
      });
    })
  }, [id])





  //relatedProducts === [{}, {}, {}, {}] array of all related products
  //will have to map and render each individal related product
  //pass in productStyles down below as well

  return (
    <div>
      {relatedProducts.map((product, i) => <Card key={i} product={product}/>)}
    </div>
  )
};

export default RelatedItems;

