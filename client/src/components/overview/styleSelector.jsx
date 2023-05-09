import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaCheckCircle } from 'react-icons/fa';

const StyleSelector = () => {
  const product = useSelector((state) => state.product);
  const {availableStyles, currentStyle} = product;

  useEffect(() => {

  }, [availableStyles]);

  return (
    <div className="styleSelector">
      {product.availableStyles.length ?
      <div className="absolute inlineBlock">
        <h3>STYLE {currentStyle.name} </h3>
        {availableStyles.map((style, index) =>
          {return style.style_id === currentStyle.style_id ?
            <div className="inlineBlock">
            <FaCheckCircle id={index} style={{display:"relative", left: "2vh", top: "1vh"}}/>
            <img className="styleElement" src={style.photos[0].thumbnail_url} alt="" key={style.product_id}/>
            </div>
            :
            <img className="styleElement" src={style.photos[0].thumbnail_url} alt="" key={style.product_id}/>
          }
        )}
      </div>
      : null}
    </div>
  )
}

export default StyleSelector