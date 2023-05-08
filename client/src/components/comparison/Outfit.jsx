import React from 'react';

const Outfit = ({outfit}) => {

  if (outfit.productStyles) {
    return (
      <div className="relatedItemCard">
        <i className="fa-solid fa-caret-up fa-2x"></i>
        <div className="imageContainer">
          <img
            className="sampleImage"
            src={outfit.productStyles[0].photos[0].url}
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
  } else {
    return (<div></div>)
  }

}

export default Outfit;