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
        <div style={{display: "flex", height: "60vh", width: "50vw"}}>
          <img src={currentStyle.photos[mainPhoto].url} alt="" style={{width: "100%", "objectFit":"contain"}}/>
          {currentStyle.photos.map((photo, index) => {
            if (index !== mainPhoto) {
              return (
                <img src={photo.thumbnail_url} alt="" key={index} id={index} onClick={onClick} style={{display: "inlineGrid", width: "100%", "objectFit":"contain"}}/>
              )
            }
          }
          )}
        </div>
        : null
      }
    </div>
  )
}

export default ImageGallery