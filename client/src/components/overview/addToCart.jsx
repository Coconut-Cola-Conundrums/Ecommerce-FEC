import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import Select from 'react-select';

const AddToCart = () => {
  const product = useSelector((state) => state.product);
  const {currentStyle} = product;

  const [availableSizes, setAvailableSizes] = useState({});
  const [selectedSku, setSelectedSku] = useState({});
  const [selectedOrder, setSelectedOrder] = useState({
    size: '',
    quantity: ''
  });

  const onClickSize = (e) => {
    e.preventDefault();
    const { size } = currentStyle.skus[Number(e.target.value)];
    let quantity = currentStyle.skus[Number(e.target.value)].quantity > 15 ? 15 : currentStyle.skus[Number(e.target.value)].quantity
    setSelectedSku({size: size, quantity: quantity});
    setSelectedOrder((prevState) => ({...prevState, size: size}));
  }

  const onClickQuantity = (e) => {
    e.preventDefault();
    let quantity = e.target.value;
    setSelectedOrder((prevState) => ({...prevState, quantity: quantity}));
  }

  const onClickAddToBag = (e) => {
    e.preventDefault();
    console.log(selectedSku);
    if (!Object.keys(selectedSku).length) { // no size has been selected
      console.log(selectedSku);
    }
  }

  useEffect(() => {
    // if product id or the current style has changed, reset the available sizes
    setSelectedSku({});
    // if there is a current style in state, add all available sizes and quantities to available sizes
    if (currentStyle.style_id) {
      let newSizes = {};
      Object.keys(currentStyle.skus).map((sku) => {
        newSizes[Number(sku)] = currentStyle.skus[sku].size
      })
      setAvailableSizes(newSizes);
    }

  }, [product.id, currentStyle]);

  return (
    <div>
       <div className="addToCart">
        {Object.keys(currentStyle).length && Object.keys(availableSizes).length && currentStyle.skus[Object.keys(availableSizes)[0]]?
          <div className="block">
            <div className="inlineBlock">
              <select className="sizeSelectors" onChange={onClickSize}>
                <option value="SELECT SIZE">SELECT SIZE</option>
                {Object.keys(availableSizes).map((sku, index) =>
                  <option value={sku} key={index}>{currentStyle.skus[sku].size}</option>
                )}
              </select>
            </div>
            <div className="inlineBlock">
              <select className="sizeSelectors" id="quantity" onChange={onClickQuantity}>
                {selectedSku.quantity ?
                  [...Array(selectedSku.quantity + 1).keys()].slice(1).map((value) =>
                    <option value={value} key={value}>{value}</option>
                  )
                : <option value="1">1</option>
                }
              </select>
            </div>
            <button className="addToBagButton" onClick={onClickAddToBag} >
              <p>ADD TO BAG</p>
              <FaPlus />
            </button>
          </div>
        :
        <select className="sizeSelectors">
          <option value="OUT OF STOCK">OUT OF STOCK</option>
        </select>
        }
      </div>
    </div>
  )
}

//  && currentStyle.skus[Object.keys(availableSizes)[0]]
export default AddToCart;