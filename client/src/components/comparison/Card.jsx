import React from 'react';

const Card = ({ product }) => {

  return (
    <div className='relatedItemCard'>
      <button>Star Button</button>
      <div>image taken from ProductStyles</div>
      <div>{product.category}</div>
      <div>{product.name}</div>
      <div>{product.default_price}</div>
      <div>Product Ratings</div>
      <div>Product default image taken from /products/:product_id/styles</div>
    </div>
  )
}

export default Card;



