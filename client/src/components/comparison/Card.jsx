import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import {Stars} from '../ratings/rating_components/stars.jsx';
import { getSpecificProduct } from '../../slices/productSlice.jsx';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const Card = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let mainProductInfo = useSelector((state) => state.product.productInformation);
  // let mainCurrentStyle = useSelector((state) => state.product.currentStyle);
  let mainAvailableStyles = useSelector((state) => state.product.availableStyles);

  const dispatch = useDispatch();

  const handleCardClick = (e) => {

    e.preventDefault();
    if (e.target.closest('.imageContainer')) {
      // Click came from the carousel arrow, do not execute handleCardClick
      e.stopPropagation();
      return;
    }

    dispatch(getSpecificProduct(product.id));
  }

  const handleCaretClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
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


  ///////////////////////////////////////////////Carousel///////////////////////////////////////////////////////////////

  const [isHovered, setIsHovered] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [cardImg, setCardImg] = useState(null);

  //set state after productStyles has been updated
  useEffect(() => {
    if (product.productStyles) {
      setCardImg(product.productStyles[0].photos[0].url);
    }
  }, [product.productStyles]);

  const handleThumbnailChange = (index, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedImageIndex(index);
  };

  const handleThumbnailClick = (index, e) => {
    console.log('is this happening');
    e.preventDefault();
    e.stopPropagation();
    setCardImg(product.productStyles[0].photos[index].url);
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };





  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
      <div className="individualCard" onClick={handleCardClick}>
        <i className="fa-solid fa-caret-up fa-2x" onClick={handleCaretClick}></i>
        <div className="imageContainer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {isHovered ? (
            <Carousel
              selectedItem={selectedImageIndex}
              showStatus={false}
              showIndicators={false}
              onChange={handleThumbnailChange}
            >
              {product.productStyles[0].photos.map((photo, index) => (
                <div key={index} onClick={(e) => handleThumbnailClick(index, e)} >
                      <img src={photo.url} alt="Product Image" />
                </div>
              ))}
            </Carousel>
          ) : (
            <img
              className="sampleImage"
              src={cardImg || "https://www.warnersstellian.com/Content/images/product_image_not_available.png"}
              alt="Product Image"
            />
          )}
        </div>
        <div data-testid="category">{product.category}</div>
        <div data-testid="name">
          <strong>{product.name}</strong>
        </div>

        {product.productStyles.some((style) => style.sale_price !== null) ? (
          <div>
            <del>${product.default_price}</del>{" "}
            <span style={{ color: "#FF6961" }}>
              ${product.productStyles.find((style) => style.sale_price !== null).sale_price}
            </span>
          </div>
        ) : (
          <div>${product.default_price}</div>
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
                    <td>{mainProductInfo.slogan}</td>
                    <td>Slogan</td>
                    <td>{product.slogan}</td>
                  </tr>
                  <tr>
                    <td>${mainProductInfo.default_price}</td>
                    <td>Default Price</td>
                    <td>${product.default_price}</td>
                  </tr>
                  <tr>
                    <td>
                      {mainAvailableStyles.some((style) => style.sale_price !== null) ? (
                          <div> ${mainAvailableStyles.find((style) => style.sale_price !== null).sale_price} </div>
                        ) : <div></div>}
                    </td>
                    <td>Sale Price</td>
                    <td>
                      {product.productStyles.some((style) => style.sale_price !== null) ? (
                        <div> ${product.productStyles.find((style) => style.sale_price !== null).sale_price} </div>
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
