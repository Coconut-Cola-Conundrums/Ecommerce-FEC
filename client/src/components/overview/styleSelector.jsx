import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaCheckCircle } from 'react-icons/fa';

const StyleSelector = () => {
  const product = useSelector((state) => state.product);
  const {availableStyles, currentStyle} = product;

  const onClickStyle = (e) => {
    e.preventDefault();
  }

  useEffect(() => {

  }, [availableStyles]);

  return (
    <div className="relative">
      {product.availableStyles.length ?
      <div>
        <h3>STYLE {currentStyle.name} </h3>
        {availableStyles.map((style, index) =>
          {return style.style_id === currentStyle.style_id ?
            <div className="inlineBlock" key={index}>
            <FaCheckCircle className="checkSelectedStyleElement" id={index} />
            <img className="styleElement selectedStyleElement" src={style.photos[0].thumbnail_url} alt="" id={style.product_id} onClick={onClickStyle}/>
            </div>
            :
            <img className="styleElement" src={style.photos[0].thumbnail_url} alt="" key={index} id={style.product_id} onClick={onClickStyle}/>
          }
        )}
      </div>
      : null}
    </div>
  )
}

export default StyleSelector