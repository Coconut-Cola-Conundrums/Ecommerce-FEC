import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { getRelatedIds, getRelatedProduct} from '../slices/comparisonSlice.jsx';
import {useState, useEffect} from 'react'

//need to pass in ID from jac's state, not in store yet
const RelatedItems = () => {

  const dispatch = useDispatch();
  let relatedCards = useSelector((state) => state.relatedItems.relatedProducts)

  //everytime the id changes, we will get use the newID to dispatch the 2 async thunks to update our relatedCards
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





  //relatedCards === [{}, {}, {}, {}] array of all related products
    //will have to map and render each individal related product

  return (

  )
};

