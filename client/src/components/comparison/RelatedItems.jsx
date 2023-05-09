import React from "react";
// import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { getRelatedIds, getRelatedProduct, getProductStyle, getOutfit } from '../../slices/comparisonSlice.jsx';
import { useEffect } from 'react'
import Card from './Card.jsx';
import Outfit from './Outfit.jsx';

//need to pass in ID from jac's state, not in store yet
const RelatedItems = () => {

  // const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  let comparisonState = useSelector((state) => state.relatedItems)
  let productId = useSelector((state) => state.product.id);

  const handleOutfitClick = (id) => {
  const outfitExists = comparisonState.outfits.some((outfit) => outfit.id === id);
  if (!outfitExists) {
    dispatch(getOutfit(id)).then(() => {
      dispatch(getProductStyle(id));
    });
  } else {
    //kindly alert that an outfit is already in the store
    console.log('outfit is already in the store');
  }
  }

  //everytime productID of overview changes... we getRelatedIds
  useEffect(() => {
    if (productId) {
      dispatch(getRelatedIds(productId))
    }
  }, [productId]);

  //everytime relatedIds state changes... we getRelatedProducts and then getProductStyles after
  useEffect(() => {
    if (comparisonState.relatedIds.length > 0) {
      Promise.all(comparisonState.relatedIds.map((id) => dispatch(getRelatedProduct(id))))
        .then(() => {
          Promise.all(comparisonState.relatedIds.map((id) => dispatch(getProductStyle(id))))
        }).then(() => {
          // setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching related products:', error);
        });
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