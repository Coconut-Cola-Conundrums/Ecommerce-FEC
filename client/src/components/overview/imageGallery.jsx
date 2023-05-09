import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

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

  const onAdjustThumbnails = (id) => {
    // 0 is down, 1 is up. 0 is right, 1 is left. Respective of photo array.
    if (!id) { // going down/right, so moving TO greater indices
      if (thumbnailRange.to <= (currentStyle.photos.length - 1)) { // if we aren't already at the highest index photo
        setThumbnailRange((prevState) => ({...prevState, to: prevState.to+ 1}))
      }
    } else { // going up, so moving FROM a higher index to a lower index of thumbnails to view
      if (thumbnailRange.from > 0) { // aren't already viewing the zeroth thumbnail
        setThumbnailRange((prevState) => ({...prevState, from: prevState.from - 1}))
      }
    }
  }

  const onScrollThumbnails = (e) => {
    e.preventDefault();
    let direction = e.target.id === "down" ? 0 : 1;
    onAdjustThumbnails(direction);
  }

  const onViewThumbnails = (e) => {
    e.preventDefault();
    let direction = e.target.id === "right" ? 0 : 1;
    if (direction) { // going right
      if (mainPhoto) { // main photo is not already at the zeroth thumbnail
        let newMain = mainPhoto - 1;
        setMainPhoto(newMain);
        if (thumbnailRange.from > newMain) {
          onAdjustThumbnails(direction);
        }
      }
    } else { // going left
      if (mainPhoto < (currentStyle.photos.length - 1)) { // not already viewing the last photo
        let newMain = mainPhoto + 1;
        setMainPhoto(newMain);
        if (thumbnailRange.to < newMain) { // if the thumbnails dont have mainphoto in view
          onAdjustThumbnails(direction);
        }
      }
    }
  }

  useEffect(() => {

  }, []);

  return (
    <div className="photoContainer">
      {currentStyle.photos ?
          <div className="absolute">
            <img className="mainPhoto" src={currentStyle.photos[mainPhoto].url} alt="" />
            <FaArrowUp id="up" className="thumbnailArrow" onClick={onScrollThumbnails}/>
            {currentStyle.photos.slice(thumbnailRange.from, thumbnailRange.to).map((photo, index) =>
              <img src={photo.thumbnail_url} alt="" key={index} id={index} onClick={onClick} className={index === mainPhoto ? "thumbnail selected" : "thumbnail"}/>
            )}
            <FaArrowDown className="thumbnailArrow" id="down" onClick={onScrollThumbnails}/>
            <div className="mainPhotoArrowBox">
              <FaArrowLeft  className="mainPhotoArrow" id="left" onClick={onViewThumbnails}/>
              <FaArrowRight className="mainPhotoArrow" id="right" onClick={onViewThumbnails}/>
            </div>
          </div>
        : null
      }
    </div>
  )
}

export default ImageGallery