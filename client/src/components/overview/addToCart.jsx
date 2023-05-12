import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import Select from 'react-select';
import { addToCart } from '../../slices/productSlice';

const AddToCart = () => {
  const product = useSelector((state) => state.product);
  const {currentStyle} = product;

  const dispatch = useDispatch();

  const [availableSizes, setAvailableSizes] = useState({});
  const [selectedSku, setSelectedSku] = useState({});
  const [selectedOrder, setSelectedOrder] = useState({
    size: '',
    quantity: 1
  });
  const [message, setMessage] = useState('');
  const [openMenu, setOpenMenu] = useState(false);

  const onClickSize = (option) => {
    const size = option.label;
    let quantity = currentStyle.skus[Number(option.value)].quantity > 15 ? 15 : currentStyle.skus[Number(option.value)].quantity
    setSelectedSku({sku: option.value,quantity: quantity});
    setSelectedOrder((prevState) => ({...prevState, size: size}));
    setMessage("");
    setOpenMenu(false);
  }

  const onClickQuantity = (option) => {
    let quantity = option.value;
    setSelectedOrder((prevState) => ({...prevState, quantity: quantity}));
  }

  const onClickAddToBag = (e) => {
    e.preventDefault();
    if (!selectedOrder.size.length) { // no size has been selected
      setMessage("Please select a size before adding to bag.");
      setOpenMenu(true);
    } else {
      dispatch(addToCart({sku_id: Number(selectedSku.sku)}));
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
            {message.length ? <h4>{message}</h4> : null}
            <div className="inlineBlock">
              <Select
                styles={{control: (baseStyles, state) => ({...baseStyles, border: "0.1vh pink solid", cursor: "pointer"})}}
                className="sizeSelectors"
                placeholder="Select Size"
                menuIsOpen={openMenu}
                options={Object.keys(availableSizes).map((sku) => ({value: sku, label: currentStyle.skus[sku].size}))}
                getOptionLabel={option => option.label}
                getOptionValue={option => option.value}
                onChange={option => onClickSize(option)}
                onFocus={() => setOpenMenu(true)}
                onBlur={() => setOpenMenu(false)}
                />
            </div>
            <div className="inlineBlock">
              <Select
                styles={{control: (baseStyles, state) => ({...baseStyles, border: "0.1vh pink solid", cursor: "pointer"})}}
                className="sizeSelectors"
                inputId="quantity"
                defaultValue={{value:1, label:1}}
                options={selectedSku.quantity ?
                [...Array(selectedSku.quantity + 1).keys()].slice(1).map((value) => ({label: value, value: value}))
                : [{value:1, label:1}]}
                getOptionValue={option => option.value}
                onChange={option => onClickQuantity(option)}/>
            </div>
            <button className="addToBagButton" onClick={onClickAddToBag} >
              <p style={{fontSize: "16px"}}>Add to bag</p>
              <FaPlus className="plusIcon"/>
            </button>
          </div>
        :
          <Select className="sizeSelectors" placeholder="OUT OF STOCK" />
        }
      </div>
    </div>
  )
}

export default AddToCart;