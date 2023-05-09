import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const StyleSelector = () => {
  const product = useSelector((state) => state.product)
  const {availableStyles, currentStyle} = product;

  useEffect(() => {

  }, [availableStyles])

  return (
    <div className="styleSelector">
      {product.availableStyles.length ?
      <>
        <h3>STYLE {currentStyle.name} </h3>
        {availableStyles.map((style, index) =>
          <img className="styleElement" src={style.photos[0].thumbnail_url} alt="" key={index}/>
        )}
      </>
      : null}
    </div>
  )
}

export default StyleSelector