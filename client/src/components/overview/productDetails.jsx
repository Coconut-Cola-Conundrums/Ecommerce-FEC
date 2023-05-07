import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ProductDetails = () => {
  const product = useSelector(state => state.product);
  // const reviews = useSelector(state => state.review); // for rendering out the stars

  const {productInformation, currentStyle} = product;

  useEffect(() => {

  }, [product]);

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