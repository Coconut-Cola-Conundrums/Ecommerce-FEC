import React, { useState } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import {Stars} from '../ratings/rating_components/stars.jsx';

const Card = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let mainProductInfo = useSelector((state) => state.product.productInformation);
  let mainCurrentStyle = useSelector((state) => state.product.currentStyle);
  let mainAvailableStyles = useSelector((state) => state.product.availableStyles);

  const handleCardClick = (id) => {
    //work with jacqueline to change state
    //import a reducer that dispatches an action to change the ID state in productSlice
    //dispatch that action with the passed in id
  }

  const handleCaretClick = () => {
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

  if (product.productStyles && product.productRatings) {
    const one = Number(product.productRatings[1]);
    const two = Number(product.productRatings[2]);
    const three = Number(product.productRatings[3]);
    const four = Number(product.productRatings[4]);
    const five = Number(product.productRatings[5]);
    const numerator = 1 * one + 2 * two + 3 * three + 4 * four + 5 * five;
    const denominator = one + two + three + four + five;

    const average = numerator / denominator;
    const fixedAvg = average.toFixed(2);

    return (
      <div className="relatedItemCard">
        <i className="fa-solid fa-caret-up fa-2x" onClick={handleCaretClick}></i>
        <div className="imageContainer">
          <img
            className="sampleImage"
            src={product.productStyles[0].photos[0].url || "https://www.warnersstellian.com/Content/images/product_image_not_available.png"}
            alt="Product Image"
          />
        </div>
        <div>{product.category}</div>
        <div>
          <strong>{product.name}</strong>
        </div>

        {product.productStyles.some(style => style.sale_price !== null) ? (
          <div>
            <del>{product.default_price}</del> {product.productStyles.find(style => style.sale_price !== null).sale_price}
          </div>
        ) : (
          <div>
            <div>${product.default_price}</div>
          </div>
        )}

        <div><Stars rating={fixedAvg}/></div>

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
                    <td>
                      {mainAvailableStyles.some((style) => style.sale_price !== null) ? (
                          <div> {mainAvailableStyles.find((style) => style.sale_price !== null).sale_price} </div>
                        ) : <div></div>}
                    </td>
                    <td>Sale Price</td>
                    <td>
                      {product.productStyles.some((style) => style.sale_price !== null) ? (
                        <div> {product.productStyles.find((style) => style.sale_price !== null).sale_price} </div>
                      ) : <div></div>}
                    </td>
                  </tr>
                  <tr>
                      <td>{mainProductInfo.features.map((feature, i) => <div key={i}>{feature.feature}: {feature.value || "NA"}</div>)}</td>
                      <td>Features</td>
                      <td>{product.features.map((feature, i) => <div key={i}>{feature.feature}: {feature.value || "NA"}</div>)}</td>
                  </tr>
                  <tr>
                    <td>{mainAvailableStyles.length}</td>
                    <td># of Available Styles</td>
                    <td>{product.productStyles.length}</td>
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
