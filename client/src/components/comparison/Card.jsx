import React from 'react';

const Card = ({ product }) => {

  return (
    <div className='relatedItemCard'>
      <i className="fa-solid fa-star" style={{color: "#95a8c6"}}></i>
      <div className="imageContainer">
        <img className="sampleImage" src="https://cdn.shopify.com/s/files/1/2538/1942/products/Black-Blank3_1.png?v=1665434810" alt="Product Image" />
      </div>
      <div>{product.category}</div>
      <div><strong>{product.name}</strong></div>
      <div><small>${product.default_price}</small></div>
      <div>Product Ratings...</div>
    </div>
  )
}

export default Card;



