import React from 'react';
import SizeSelector from './sizeSelector';
import { FaPlus } from 'react-icons/fa';

const AddToCart = () => {
  return (
    <div>
      <SizeSelector />
      <div>
          <button className="addToBagButton">
            <p>ADD TO BAG</p>
            <FaPlus />
          </button>
      </div>
    </div>
  )
}

export default AddToCart;