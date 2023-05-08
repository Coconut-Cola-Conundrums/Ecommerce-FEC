import React, { useState } from 'react';
import Modal from 'react-modal';

const Card = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalStyles = {
    overlay: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      position: 'auto',
      width: '400px',
      height: '300px',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '4px'
    }
  };

  if (product.productStyles) {
    return (
      <div className="relatedItemCard">
        <i className="fa-solid fa-caret-up fa-2x" onClick={handleCardClick}></i>
        <div className="imageContainer">
          <img
            className="sampleImage"
            src={product.productStyles[0].photos[0].url}
            alt="Product Image"
          />
        </div>
        <div>{product.category}</div>
        <div>
          <strong>{product.name}</strong>
        </div>
        <div>
          <small>${product.default_price}</small>
        </div>
        <div>Product Ratings...</div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Product Details Modal"
          ariaHideApp={false}
          style={modalStyles}
        >
          <div className="modalContainer">
            <h2>{product.name}</h2>
            <h2>Product 2</h2>
          </div>
        </Modal>
      </div>
    );
  } else {
    return (<div></div>)
  }
};

export default Card;
