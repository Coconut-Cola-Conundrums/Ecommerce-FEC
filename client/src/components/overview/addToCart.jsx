import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const AddToCart = () => {
  const product = useSelector((state) => state.product);
  const {currentStyle} = product;

  const [availableSizes, setAvailableSizes] = useState({});

  useEffect(() => {
    // if product id or the current style has changed, reset the available sizes
    setAvailableSizes({});
    // if there is a current style in state, add all available sizes and quantities to available sizes
    if (currentStyle.style_id){
      Object.keys(currentStyle.skus).map((sku) => {
        setAvailableSizes((prevState) => ({...prevState, [currentStyle.skus[sku].size] : currentStyle.skus[sku].quantity}))})
      }
  }, [product.id, currentStyle]);

  console.log(currentStyle, availableSizes);
  return (
    <div className="addToCart">
        {Object.keys(availableSizes).length ?
          <select>
            <option value="SELECT SIZE">SELECT SIZE</option>
            {Object.keys(availableSizes).map((size, index) =>
            <option value={size} key={index}>{size}</option>
            )}
          </select>
        :
        <select>
          <option value="OUT OF STOCK">OUT OF STOCK</option>
        </select>
        }

    </div>
  )
}

export default AddToCart