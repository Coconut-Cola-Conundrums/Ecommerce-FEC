import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaCheckCircle } from 'react-icons/fa';
import { setCurrentStyle } from '../../slices/productSlice';

const StyleSelector = () => {
  const product = useSelector((state) => state.product);
  const {availableStyles, currentStyle} = product;

  const dispatch = useDispatch();

  const onClickStyle = (e) => {
    e.preventDefault();
    const id = e.target.id;
    dispatch(setCurrentStyle(id));
  }

  useEffect(() => {

  }, [availableStyles]);

  console.log(product);
  return (
    <div className="relative">
      {product.availableStyles.length ?
      <div>
        <h4>STYLE {`>`} {currentStyle.name} </h4>
        {availableStyles.map((style, index) =>
          {return style.style_id === currentStyle.style_id ?
            <div className="inlineBlock" key={index}>
              <div className="styleBox">
                <FaCheckCircle className="checkSelectedStyleElement" id={index} />
                <img className="styleElement selectedStyleElement" src={style.photos[0].thumbnail_url} alt="" id={style.style_id} onClick={onClickStyle} data-testid="selectedStyle"/>
              </div>
            </div>
            :
            <div className="styleBox">
            <img className="styleElement" src={style.photos[0].thumbnail_url} alt="" key={index} id={style.style_id} onClick={onClickStyle} data-testid="unselectedStyle"/>
            </div>
          }
        )}
      </div>
      : null}
    </div>
  )
}

export default StyleSelector