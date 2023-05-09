import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getRelatedIds, getRelatedProduct, getProductStyle, getOutfit } from '../../slices/comparisonSlice.jsx';
import { useEffect } from 'react'
import Card from './Card.jsx';
import Outfit from './Outfit.jsx';
import { saveOutfits, grabOutfits } from './outfitStorage.js';
import { comparisonSlice } from '../../slices/comparisonSlice';


const RelatedItems = () => {

  const dispatch = useDispatch();
  let comparisonState = useSelector((state) => state.relatedItems)
  let productId = useSelector((state) => state.product.id);

  const handleOutfitClick = (id) => {
    const outfitExists = comparisonState.outfits.some((outfit) => outfit.id === id);
    if (!outfitExists) {
      dispatch(getOutfit(id)).then(() => {
        dispatch(getProductStyle(id))
      });
    } else {
      //kindly alert the users
      console.log('Outfit is already in the store');
    }
  };

  //only save outfits to localStorage when relatedItems.outfits is updated
  useEffect(() => {
    if (comparisonState.outfits.length > 0) {
      const updatedOutfits = [...comparisonState.outfits];
      saveOutfits(updatedOutfits);
    }
  }, [comparisonState.outfits]);

  //initalization to populate relatedItems.outfits after refresh
  useEffect(() => {
    const persistedOutfits = grabOutfits();
    if (persistedOutfits && persistedOutfits.length > 0) {
      dispatch(comparisonSlice.actions.addOutfits(persistedOutfits));
    }
  }, []);

  //everytime productID of overview changes... we getRelatedIds
  useEffect(() => {
    if (productId) {
      dispatch(getRelatedIds(productId))
    }
  }, [productId]);

  //everytime relatedIds state changes... we getRelatedProducts and then getProductStyles after
  useEffect(() => {
    if (comparisonState.relatedIds.length > 0) {
<<<<<<< HEAD
      // console.log('this should be relatedIDS state arr: ', comparisonState.relatedIds)
      comparisonState.relatedIds.forEach((id) => {
        dispatch(getRelatedProduct(id));
      });
=======
      Promise.all(comparisonState.relatedIds.map((id) => dispatch(getRelatedProduct(id))))
        .then(() => {
          Promise.all(comparisonState.relatedIds.map((id) => dispatch(getProductStyle(id))))
        }).then(() => {
          // setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching related products:', error);
        });
>>>>>>> be60cb0d40ae1f37eef44b06a7d302ab5dc11f4f
    }
  }, [comparisonState.relatedIds]);


    return (
      <div>
      <h1>Related Products</h1>
      <div className="relatedItemsContainer">
        {comparisonState.relatedProducts.map((product, i) => <Card key={i} product={product}/>)}
      </div>
      <h1>Your Outfits</h1>
      <div className="relatedItemsContainer">
        <div className="relatedItemCard">
        <i className="fa-regular fa-square-plus fa-2xl" onClick={() => handleOutfitClick(productId)}></i>
        </div>
        {comparisonState.outfits.map((outfit, i) => ( <Outfit key={i} outfit={outfit} /> ))}
      </div>
      </div>
    )

};

export default RelatedItems;