import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const AddToCart = () => {
  const product = useSelector((state) => state.product);
  const {currentStyle} = product;

  const [availableSizes, setAvailableSizes] = useState({});
  const [selectedSku, setSelectedSku] = useState({});

  const onClickSize = (e) => {
    e.preventDefault();
    const { size } = currentStyle.skus[Number(e.target.value)];
    let quantity = currentStyle.skus[Number(e.target.value)].quantity > 15 ? 15 : currentStyle.skus[Number(e.target.value)].quantity
    setSelectedSku({size: size, quantity: quantity});
  }

  useEffect(() => {
    // if product id or the current style has changed, reset the available sizes
    setAvailableSizes({});
    // if there is a current style in state, add all available sizes and quantities to available sizes
    if (currentStyle.style_id) {
      Object.keys(currentStyle.skus).map((sku) => {
        setAvailableSizes((prevState) => ({...prevState, [sku] : currentStyle.skus[sku].size}))})
      }

  }, [product.id, currentStyle, selectedSku]);

  console.log(currentStyle, availableSizes, selectedSku);
  return (
    <div className="addToCart">
        {Object.keys(availableSizes).length ?
          <div className="wrapper">
            <div className="inlineBlock">
              <select onChange={onClickSize}>
                <option value="SELECT SIZE">SELECT SIZE</option>
                {Object.keys(availableSizes).map((sku, index) =>
                <option value={sku} key={index}>{currentStyle.skus[sku].size}</option>
                )}
              </select>
            </div>
            <div className="inlineBlock">
              <select>
                {selectedSku.quantity ?
                  [...Array(selectedSku.quantity + 1).keys()].slice(1).map((value) =>
                    <option value={value} key={value}>{value}</option>
                  )
                : <option value="1">1</option>
                }
              </select>
            </div>
          </div>
        :
        <select>
          <option value="OUT OF STOCK">OUT OF STOCK</option>
        </select>
        }

    </div>
  )
}

export default AddToCart