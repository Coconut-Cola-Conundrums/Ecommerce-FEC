import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaCheckCircle } from 'react-icons/fa';
import { setCurrentStyle } from '../../slices/productSlice';

const StyleSelector = () => {
  const product = useSelector((state) => state.product);
  const {availableStyles, currentStyle} = product;

  let defaultUrl = "https://images.pexels.com/photos/249210/pexels-photo-249210.jpeg?cs=srgb&dl=pexels-nitin-dhumal-249210.jpg&fm=jpg";

  const dispatch = useDispatch();

  const onClickStyle = (e) => {
    e.preventDefault();
    const id = e.target.id;
    dispatch(setCurrentStyle(id));
  }

  useEffect(() => {

  }, [availableStyles]);


  // console.log(availableStyles);
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
                <img
                  className="styleElement selectedStyleElement"
                  src={style.photos[0].thumbnail_url || defaultUrl}
                  data-testid="styleElement"
                  id={style.style_id}
                  onClick={onClickStyle} />
              </div>
            </div>
            :
            <div className="styleBox" key={index} >
              <img
                className="styleElement"
                src={style.photos[0].thumbnail_url || defaultUrl}
                data-testid="styleElement"
                id={style.style_id}
                onClick={onClickStyle}/>
            </div>
          }
        )}
      </div>
      : null}
    </div>
  )
}

export default StyleSelector