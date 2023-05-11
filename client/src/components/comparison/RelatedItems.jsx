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
  const carouselRefForRelated = useRef(null);
  const carouselRefForOutfits = useRef(null);
  const [scrollPositionForRelated, setScrollPositionForRelated] = useState(0);
  const [scrollPositionForOutfits, setScrollPositionForOutfits] = useState(0);
  const [showLeftArrowForRelated, setShowLeftArrowForRelated] = useState(false);
  const [showRightArrowForRelated, setShowRightArrowForRelated] = useState(true);
  const [showLeftArrowForOutfits, setShowLeftArrowForOutfits] = useState(false);
  const [showRightArrowForOutfits, setShowRightArrowForOutfits] = useState(true);

  const handleScrollForRelated = () => {
    const container = carouselRefForRelated.current;
    if (container) {
      const scrollLeft = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.offsetWidth - 50;
      setScrollPositionForRelated(scrollLeft);
      setShowLeftArrowForRelated(scrollLeft > 0);
      setShowRightArrowForRelated(scrollLeft < maxScrollLeft);
    }
  };

  const scrollToLeftInRelated = () => {
    const container = carouselRefForRelated.current;
    if (container) {
      const cardWidth = container.querySelector('.relatedItemCard').offsetWidth;
      container.scrollTo({
        left: scrollPositionForRelated - cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollToRightInRelated = () => {
    const container = carouselRefForRelated.current;
    if (container) {
      const cardWidth = container.querySelector('.relatedItemCard').offsetWidth;
      container.scrollTo({
        left: scrollPositionForRelated + cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollForOutfits = () => {
    const container = carouselRefForOutfits.current;
    if (container) {
      const scrollLeft = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.offsetWidth - 50;
      setScrollPositionForOutfits(scrollLeft);
      setShowLeftArrowForOutfits(scrollLeft > 0);
      setShowRightArrowForOutfits(scrollLeft < maxScrollLeft);
    }
  };

  const scrollToLeftInOutfits = () => {
    const container = carouselRefForOutfits.current;
    if (container) {
      const cardWidth = container.querySelector('.outfitCard').offsetWidth;
      container.scrollTo({
        left: scrollPositionForOutfits - cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollToRightInOutfits = () => {
    const container = carouselRefForOutfits.current;
    if (container) {
      const cardWidth = container.querySelector('.outfitCard').offsetWidth;
      container.scrollTo({
        left: scrollPositionForOutfits + cardWidth,
        behavior: 'smooth',
      });
    }
  };



  return (
    <div>
      <h1>Related Products</h1>

      <div className="relatedItemsContainer">

      {showLeftArrowForRelated && (
        <button className="carouselArrow leftArrow" onClick={scrollToLeftInRelated}>
          &lt;
        </button>
      )}

      <div ref={carouselRefForRelated} className="carouselContainer" onScroll={handleScrollForRelated}>
        {comparisonState.relatedProducts.map((product, i) => (
          <div key={i} className="relatedItemCard">
            <Card product={product} />
          </div>
        ))}
      </div>


      {showRightArrowForRelated && (
        <button className="carouselArrow rightArrow" onClick={scrollToRightInRelated}>
          &gt;
        </button>
      )}

      </div>

      <h1>Your Outfits</h1>
      <div className="outfitsContainer">

        {showLeftArrowForOutfits && (
          <button className="carouselArrow leftArrow" onClick={scrollToLeftInOutfits}>
            &lt;
          </button>
        )}

        <div ref={carouselRefForOutfits} className="outfitsCarouselContainer" onScroll={handleScrollForOutfits}>
          <div className="outfitCard">
            <i className="fa-regular fa-square-plus fa-2xl" onClick={() => handleOutfitClick(productId)}></i>
          </div>


          {comparisonState.outfits.map((outfit, i) => (
          <div key={i} className="outfitCard">
            <Outfit key={i} index={i} outfit={outfit} />
          </div>
          ))}

        </div>

        {showRightArrowForOutfits && (
        <button className="carouselArrow rightArrow" onClick={scrollToRightInOutfits}>
          &gt;
        </button>
        )}


      </div>
    </div>
  );

};

export default RelatedItems;

