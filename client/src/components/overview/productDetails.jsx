import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Stars } from '../ratings/rating_components/stars.jsx';

const ProductDetails = () => {
  const product = useSelector(state => state.product);
  const reviews = useSelector(state => state.reviews);

  let totalReviews = 0;
  const avgRatings = Object.keys(reviews.ratings).reduce((accumulator, key) => {
    accumulator += Number(reviews.ratings[key]) * Number(key);
    totalReviews += Number(reviews.ratings[key]);
    return accumulator;
  }, 0) / totalReviews;

  const {productInformation, currentStyle} = product;
  useEffect(() => {

  }, [productInformation, currentStyle, reviews]); // product information will change when new product is clicked, currentstyle will change the price when a new style is clicked
  return (
    <div className="relative productDetails">
      <Stars rating={avgRatings.toFixed(2)} />
      <h1 >{productInformation.category} </h1>
      <h2>{productInformation.name}</h2>
      {currentStyle.sale_price ?
        <>
          <h2 className="originalPriceOnSale">${currentStyle.original_price}</h2>
          <h2>${currentStyle.sale_price}</h2>
        </>
        :
        <h2>${currentStyle.original_price}</h2>
      }
    </div>
  )
}

export default ProductDetails