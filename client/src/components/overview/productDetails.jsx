import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ProductDetails = () => {
  const product = useSelector(state => state.product);
  // const reviews = useSelector(state => state.review); // for rendering out the stars

  const {productInformation, currentStyle} = product;
  useEffect(() => {
   // console.log(productInformation)
    //console.log(currentStyle)
  }, [productInformation, currentStyle]); // product information will change when new product is clicked, currentstyle will change the price when a new style is clicked

  return (
    <div className="productDetails">
      <h1 >{productInformation.category} </h1>
      <h2>{productInformation.name}</h2>
      <h2>{currentStyle.original_price}</h2>
      {currentStyle.sale_price !== '0' ? <h2>{currentStyle.sale_price}</h2> : null}
      <p>{productInformation.description}</p>
    </div>
  )
}

export default ProductDetails