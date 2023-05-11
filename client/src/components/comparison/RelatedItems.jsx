import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getRelatedIds, getRelatedProduct, getProductStyle, getOutfit, getMeta } from '../../slices/comparisonSlice.jsx';
import { useEffect, useState } from 'react'
import Card from './Card.jsx';
import Outfit from './Outfit.jsx';
import { saveOutfits, grabOutfits } from './outfitStorage.js';
import { comparisonSlice } from '../../slices/comparisonSlice';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';


const RelatedItems = () => {

  const dispatch = useDispatch();
  let comparisonState = useSelector((state) => state.relatedItems)
  let productId = useSelector((state) => state.product.id);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleOutfitClick = (id) => {
    const outfitExists = comparisonState.outfits.some((outfit) => outfit.id === id);
    if (!outfitExists) {
      dispatch(getOutfit(id)).then(() => {
        dispatch(getProductStyle(id)).then(()=> {
          dispatch(getMeta(id))
        })
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
      Promise.all(comparisonState.relatedIds.map((id) => dispatch(getRelatedProduct(id))))
        .then(() => {
          Promise.all(comparisonState.relatedIds.map((id) => dispatch(getProductStyle(id))))
        }).then(() => {
          Promise.all(comparisonState.relatedIds.map((id) => dispatch(getMeta(id))))
        })
        .catch((error) => {
          console.error('Error fetching related products:', error);
        });
    }
  }, [comparisonState.relatedIds]);

  const handleLeftArrowClick = () => {
    const container = document.getElementById("relatedItemsContainer");
    if (container) {
      const containerWidth = container.offsetWidth;
      const newPosition = scrollPosition - containerWidth;
      setScrollPosition(newPosition);
      setShowRightArrow(true);
      if (newPosition <= 0) {
        setShowLeftArrow(false);
      }
    }
  };

  const handleRightArrowClick = () => {
    const container = document.getElementById("relatedItemsContainer");
    if (container) {
      const containerWidth = container.offsetWidth;
      const trackWidth = container.scrollWidth;
      const newPosition = scrollPosition + containerWidth;
      setScrollPosition(newPosition);
      setShowLeftArrow(true);
      if (newPosition + containerWidth >= trackWidth) {
        setShowRightArrow(false);
      }
    }
  };

  return (
    <div>
      <h1>Related Products</h1>
      <div className="relatedItemsContainer">
        <div className="carouselArrowLeft">
          <FaArrowCircleLeft
            className="carouselArrow"
            onClick={handleLeftArrowClick}
            style={{ visibility: showLeftArrow ? 'visible' : 'hidden' }}
          />
        </div>

        {comparisonState.relatedProducts.map((product, i) => ( <Card key={i} product={product} /> ))}

        <div className="carouselArrowRight">
          <FaArrowCircleRight
            className="carouselArrow"
            onClick={handleRightArrowClick}
            style={{ visibility: showRightArrow ? 'visible' : 'hidden' }}
          />
        </div>
      </div>

      <h1>Your Outfits</h1>
      <div className="relatedItemsContainer">
        <div className="carouselArrowLeft">
          <FaArrowCircleLeft
            className="carouselArrow"
            onClick={handleLeftArrowClick}
            style={{ visibility: showLeftArrow ? 'visible' : 'hidden' }}
          />
        </div>

        <div className="relatedItemCard">
          <i className="fa-regular fa-square-plus fa-2xl" onClick={() => handleOutfitClick(productId)}></i>
        </div>

        {comparisonState.outfits.map((outfit, i) => ( <Outfit key={i} index={i} outfit={outfit} /> ))}
        
        <div className="carouselArrowRight">
          <FaArrowCircleRight
            className="carouselArrow"
            onClick={handleRightArrowClick}
            style={{ visibility: showRightArrow ? 'visible' : 'hidden' }}
          />
        </div>
      </div>
    </div>
  );

};

export default RelatedItems;

