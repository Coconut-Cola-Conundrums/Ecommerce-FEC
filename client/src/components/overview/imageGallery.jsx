import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ImageGallery = () => {
  const product = useSelector((state) => state.product);
  const {currentStyle} = product;

  const [mainPhoto, setMainPhoto] = useState(0);

  const onClick = (e) => {
    e.preventDefault();
    setMainPhoto(e.target.id);
  }

  useEffect(() => {

  }, [product, mainPhoto]);

  return (
    <div>
      {currentStyle.photos ?
        <div className="photoContainer">
          <img className="absolute mainPhoto" src={currentStyle.photos[mainPhoto].url} alt=""/>
          <div className="absolute">
            {currentStyle.photos.map((photo, index) =>
              <img src={photo.thumbnail_url} alt="" key={index} id={index} onClick={onClick} className="thumbnail"/>
            )}
          </div>
        </div>
        : null
      }
    </div>
  )
}

export default ImageGallery