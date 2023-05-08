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

  return (
    <div className="relatedItemCard">
      <i className="fa-solid fa-caret-up" onClick={handleCardClick}></i>
      <div className="imageContainer">
        <img
          className="sampleImage"
          src="https://cdn.shopify.com/s/files/1/2538/1942/products/Black-Blank3_1.png?v=1665434810"
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
};

export default Card;