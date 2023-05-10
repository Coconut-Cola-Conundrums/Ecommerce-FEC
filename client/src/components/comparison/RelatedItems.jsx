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

  const [carouselPosition, setCarouselPosition] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [cardWidth, setCardWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const handleLeftArrowClick = () => {
    if (carouselPosition > 0) {
      setCarouselPosition((prevPosition) => prevPosition - 1);
    }
  };

  const handleRightArrowClick = () => {
    if (carouselPosition < comparisonState.relatedProducts.length - 1) {
      setCarouselPosition((prevPosition) => prevPosition + 1);
    }
  };

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
      setCarouselPosition(0); // Reset carousel position on new product
      setShowLeftArrow(false); // Hide left arrow initially
      setShowRightArrow(true); // Show right arrow initially
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

  useEffect(() => {
    const handleResize = () => {
      const containerElement = document.getElementById('carouselContainer');
      const cardElement = document.getElementById('relatedCard');

      if (containerElement && cardElement) {
        setContainerWidth(containerElement.offsetWidth);
        setCardWidth(cardElement.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize container and card width

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  return (
    <div>
      <h1>Related Products</h1>
      <div id="carouselContainer" className="carouselContainer">
        {/* Left arrow */}
        <FaArrowCircleLeft
          className="carouselArrow"
          onClick={handleLeftArrowClick}
          style={{ visibility: showLeftArrow ? 'visible' : 'hidden' }}
        />
        <div className="carousel">
          <div
            className="carouselTrack"
            style={{
              transform: `translateX(${carouselPosition * -cardWidth}px)`,
              width: `${comparisonState.relatedProducts.length * cardWidth}px`,
            }}
          >
            {comparisonState.relatedProducts.map((product, i) => (
              <Card key={i} product={product} id="relatedCard" />
            ))}
          </div>
        </div>
        {/* Right arrow */}
        <FaArrowCircleRight
          className="carouselArrow"
          onClick={handleRightArrowClick}
          style={{ visibility: showRightArrow ? 'visible' : 'hidden' }}
        />
      </div>
      <h1>Your Outfits</h1>
      <div className="relatedItemsContainer"> {/* Add the className here */}
        <div className="relatedItemCard">
          <i className="fa-regular fa-square-plus fa-2xl" onClick={() => handleOutfitClick(productId)}></i>
        </div>
        {comparisonState.outfits.map((outfit, i) => (
          <Outfit key={i} index={i} outfit={outfit} />
        ))}
      </div>
    </div>
  );

};

export default RelatedItems;