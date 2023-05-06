import React from "react";
// import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { getRelatedIds, getRelatedProduct, getProductStyle } from '../../slices/comparisonSlice.jsx';
import { useEffect } from 'react'
import Card from './Card.jsx';

//need to pass in ID from jac's state, not in store yet
const RelatedItems = () => {

  const dispatch = useDispatch();
  let comparisonState = useSelector((state) => state.relatedItems)
  let productId = useSelector((state) => state.product.id);
  //make another useSelector to select styles State

  //everytime productID of overview changes... we getRelatedIds
  useEffect(() => {
    if (productId) {
      dispatch(getRelatedIds(productId));
    }
  }, [productId]);

  //everytime relatedIds state changes... we getRelatedProducts
  useEffect(() => {
    if (comparisonState.relatedIds.length > 0) {
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
      comparisonState.relatedIds.forEach((id) => {
        dispatch(getProductStyle(id));
      });
    }
  }, [comparisonState.relatedIds, comparisonState.relatedProducts]);





  //relatedProducts === [{}, {}, {}, {}] array of all related products
  //will have to map and render each individal related product
  //pass in productStyles down below as well

  //conditional render below

  return (
    <div className="relatedItemsContainer">
      {comparisonState.relatedProducts.map((product, i) => <Card key={i} product={product}/>)}
    </div>
  )
};

export default RelatedItems;

