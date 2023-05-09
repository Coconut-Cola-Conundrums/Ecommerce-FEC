import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ProductDescription = () => {
  const productInformation = useSelector((state) => state.product.productInformation);

  useEffect(() => {

  }, [])

  return (
    <div>
      {productInformation.slogan ?
        <>
          <h2>{productInformation.slogan}</h2>
          <p>{productInformation.description}</p>
        </>
      : null
      }
    </div>
  )
}
export default ProductDescription