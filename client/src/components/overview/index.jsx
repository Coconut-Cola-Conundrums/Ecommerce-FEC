import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInitialData, getSpecificProduct, getStyles } from '../../slices/productSlice.jsx';
import ImageGallery from './imageGallery';
import StyleSelector from './styleSelector';
import ProductDetails from './productDetails.jsx';
import AddToCart from './addToCart.jsx';
import ProductDescription from './productDescription'
// actions to get started
  // get product information
  // get review information
  // get style information


// 'sub-modules' to render out
  // product information
    // product category
    // product title
    // review stars, derived from review info
    // price, derived from style info
    // share on socials
  // style selector
    // available styles displayed as thumbnails
  // add to cart
    // select size, derived from style info
    // select quantity, derived from style info
  // image gallery
    // main image
    // thumbnail of images to render to main
    // zoom option


// sub-module actions
  // change style
  // add to cart - select size, select quantity
  // zoom image

const Overview = () => {
  const product = useSelector(state => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!product.id) { // if no product has been loaded, then this is the initial render, and we need to fetch the default data
      dispatch(getInitialData()) // get initial data and set the id in the state

      .then(() => dispatch(getSpecificProduct())) // then get product information for that id
      .then(() => dispatch(getStyles())); // then get styles and update them

    }
  }, []);

  return (
    <div className="wrapper">
      <div>
        <ImageGallery />
        <ProductDescription />
      </div>
      <div style={{position: "absolute"}}>
        <ProductDetails />
        <StyleSelector />
        <AddToCart />
      </div>
    </div>
  )
}

export default Overview
