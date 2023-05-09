import React, { useState } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';

const Card = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let mainProductInfo = useSelector((state) => state.product.productInformation);
  let mainCurrentStyle = useSelector((state) => state.product.currentStyle);

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
      width: '500px',
      height: '400px',
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
          <h2>Comparing</h2>
            <div className="comparisonTable">
              <table>
                <thead>
                  <tr>
                    <th>{mainProductInfo.name}</th>
                    <th></th>
                    <th>{product.name}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{mainProductInfo.description}</td>
                    <td>Description</td>
                    <td>{product.description}</td>
                  </tr>
                  <tr>
                    <td>{mainProductInfo.category}</td>
                    <td>Category</td>
                    <td>{product.category}</td>
                  </tr>
                  <tr>
                    <td>{mainProductInfo.default_price}</td>
                    <td>Default Price</td>
                    <td>{product.default_price}</td>
                  </tr>
                  <tr>
                    <td>{mainCurrentStyle.sale_price || 'N/A'}</td>
                    <td>Sale Price</td>
                    <td>{product.productStyles[0].sale_price || 'N/A'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Modal>
      </div>
    );
  } else {
    return (<div></div>)
  }
};

export default Card;
