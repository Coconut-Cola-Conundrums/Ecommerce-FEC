import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const StyleSelector = () => {
  const product = useSelector((state) => state.product)

  useEffect(() => {

  }, [product])

  return (
    <div className="styleSelector">
      {product.availableStyles.length ?
      <h3>STYLE {product.currentStyle.name} </h3>
      : null}
    </div>
  )
}

export default StyleSelector