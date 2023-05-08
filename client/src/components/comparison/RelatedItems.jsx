import React from "react";
// import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { getRelatedIds, getRelatedProduct, getProductStyle, getOutfit } from '../../slices/comparisonSlice.jsx';
import { useEffect, useState } from 'react'
import Card from './Card.jsx';
import Outfit from './Outfit.jsx';

//need to pass in ID from jac's state, not in store yet
const RelatedItems = () => {

  const dispatch = useDispatch();
  let comparisonState = useSelector((state) => state.relatedItems)
  let productId = useSelector((state) => state.product.id);

  const handleOutfitClick = (id) => {
    dispatch(getOutfit(id));
  }

  //everytime productID of overview changes... we getRelatedIds
  useEffect(() => {

    if (productId) {
      dispatch(getRelatedIds(productId));

    }
  }, [productId]);

  //everytime relatedIds state changes... we getRelatedProducts
  useEffect(() => {
    if (comparisonState.relatedIds.length > 0) {
      // console.log('this should be relatedIDS state arr: ', comparisonState.relatedIds)
      comparisonState.relatedIds.forEach((id) => {
        dispatch(getRelatedProduct(id));
      });
    }
  }, [comparisonState.relatedIds]);

  useEffect(() => {
    if (
      comparisonState.relatedIds.length > 0 &&
      comparisonState.relatedProducts.length === comparisonState.relatedIds.length
    ) {
      // console.log('hello') this is working
      comparisonState.relatedIds.forEach((id) => {
        dispatch(getProductStyle(id));
      });
    }
  }, [comparisonState.relatedIds, comparisonState.relatedProducts]);

  //pass in productStyles down below as well
  //conditional render below...?

  return (
    <div>
    <div className="relatedItemsContainer">
      {comparisonState.relatedProducts.map((product, i) => <Card key={i} product={product}/>)}
    </div>
    <button onClick={() => handleOutfitClick(productId)}>add to outfit</button>
    <div className="relatedItemsContainer">
        {comparisonState.outfits.map((outfit, i) => ( <Outfit key={i} outfit={outfit} /> ))}
    </div>
    </div>

  )
};

export default RelatedItems;