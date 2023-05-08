import React from 'react';

const Outfit = ({outfit}) => {

  return (
    <div className="relatedItemCard">
      <i className="fa-solid fa-caret-up"></i>
      <div className="imageContainer">
        <img
          className="sampleImage"
          src="https://cdn.shopify.com/s/files/1/2538/1942/products/Black-Blank3_1.png?v=1665434810"
          alt="Product Image"
        />
      </div>
      <div>{outfit.category}</div>
      <div>
        <strong>{outfit.name}</strong>
      </div>
      <div>
        <small>${outfit.default_price}</small>
      </div>
      <div>Product Ratings...</div>
    </div>
  )
}

export default Outfit;