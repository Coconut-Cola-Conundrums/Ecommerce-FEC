import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { FaArrowCircleLeft, FaArrowCircleRight, FaArrowCircleUp, FaArrowCircleDown } from 'react-icons/fa';

const ImageGallery = () => {
  const product = useSelector((state) => state.product);
  const {currentStyle} = product;

  const [mainPhoto, setMainPhoto] = useState(0);
  const [thumbnailRange, setThumbnailRange] = useState({
    from: 0,
    to: 6
  })

  const onClick = (e) => {
    e.preventDefault();
    setMainPhoto(Number(e.target.id));
  }

  const onAdjustThumbnails = (dir) => {
    // 0 is down, 1 is up. 0 is right, 1 is left. Respective of photo array.
    if (!dir) { // going down/right, so moving TO greater indices
      if (thumbnailRange.to <= (currentStyle.photos.length - 1)) { // if we aren't already at the highest index photo
        setThumbnailRange((prevState) => ({to: prevState.to+ 1, from: prevState.from + 1}))
      }
    } else { // going up, so moving FROM a higher index to a lower index of thumbnails to view
      if (thumbnailRange.from > 0) { // aren't already viewing the zeroth thumbnail
        setThumbnailRange((prevState) => ({to: prevState.to - 1, from: prevState.from - 1}))
      }
    }
  }

  const onScrollThumbnails = (e) => {
    e.preventDefault();
    if (e.target.id === "down") {
      onAdjustThumbnails(0);
    } else if (e.target.id === "up") {
      onAdjustThumbnails(1);
    }
  }

  const onViewThumbnails = (e) => {
    e.preventDefault();
    if (e.target.id === "left") { // going left, aka 1
      if (mainPhoto) { // main photo is not already at the zeroth thumbnail
        let newMain = mainPhoto - 1;
        setMainPhoto(newMain);
        if (thumbnailRange.from > newMain) {
          onAdjustThumbnails(1);
        }
      }
    } else if (e.target.id === "right") { // going right, aka 0
      if (mainPhoto < (currentStyle.photos.length - 1)) { // not already viewing the last photo
        let newMain = mainPhoto + 1;
        setMainPhoto(newMain);
        if (thumbnailRange.to < newMain) { // if the thumbnails dont have mainphoto in view
          onAdjustThumbnails(0);
        }
      }
    }
  }
  useEffect(() => {

  }, [product.id, currentStyle]);

  return (
    <div className="photoContainer">
      {currentStyle.photos ?
          <div className="absolute">
            <img className="mainPhoto" src={currentStyle.photos[mainPhoto].url} alt="" />
            <FaArrowCircleUp id="up" className="thumbnailArrow" onClick={onScrollThumbnails} fill="#5f9ea0"/>
            {currentStyle.photos.slice(thumbnailRange.from, thumbnailRange.to).map((photo, index) =>
              <img src={photo.thumbnail_url} alt="" key={index} id={index} onClick={onClick} className={index === mainPhoto ? "thumbnail selected" : "thumbnail"}/>
            )}
            <FaArrowCircleDown className="thumbnailArrow" id="down" onClick={onScrollThumbnails} fill="#5f9ea0"/>
            <div className="mainPhotoArrowBox">
              <FaArrowCircleLeft className="mainPhotoArrow" id="left" onClick={onViewThumbnails} fill="#5f9ea0"/>
              <FaArrowCircleRight className="mainPhotoArrow" id="right" onClick={onViewThumbnails} fill="#5f9ea0"/>
              </div>
          </div>
        : null
      }
    </div>
  )
}

export default ImageGallery