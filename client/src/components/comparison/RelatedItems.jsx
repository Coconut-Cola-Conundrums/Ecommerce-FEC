import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getRelatedIds, getRelatedProduct, getProductStyle, getOutfit, getMeta } from '../../slices/comparisonSlice.jsx';
import { useEffect, useRef, useState } from 'react'
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

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const carouselRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    const container = carouselRef.current;
    if (container) {
      const scrollLeft = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.offsetWidth - 50;
      setScrollPosition(scrollLeft);
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < maxScrollLeft);
    }
  };

  const scrollToLeft = () => {
    const container = carouselRef.current;
    if (container) {
      const cardWidth = container.querySelector('.relatedItemCard').offsetWidth;
      container.scrollTo({
        left: scrollPosition - cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollToRight = () => {
    const container = carouselRef.current;
    if (container) {
      const cardWidth = container.querySelector('.relatedItemCard').offsetWidth;
      container.scrollTo({
        left: scrollPosition + cardWidth,
        behavior: 'smooth',
      });
    }
  };


  return (
    <div>
      <h1>Related Products</h1>

      <div className="relatedItemsContainer">

      {showLeftArrow && (
        <button className="carouselArrow leftArrow" onClick={scrollToLeft}>
          &lt;
        </button>
      )}

      <div ref={carouselRef} className="carouselContainer" onScroll={handleScroll}>
        {comparisonState.relatedProducts.map((product, i) => (
          <div key={i} className="relatedItemCard">
            <Card product={product} />
          </div>
        ))}
      </div>


      {showRightArrow && (
        <button className="carouselArrow rightArrow" onClick={scrollToRight}>
          &gt;
        </button>
      )}

      </div>

      <h1>Your Outfits</h1>
      <div className="outfitsContainer">


        <div className="relatedItemCard">
          <i className="fa-regular fa-square-plus fa-2xl" onClick={() => handleOutfitClick(productId)}></i>
        </div>

        <div className='outfitsContainer'>
          {comparisonState.outfits.map((outfit, i) => ( <Outfit key={i} index={i} outfit={outfit} /> ))}
        </div>


      </div>
    </div>
  );

};

export default RelatedItems;

