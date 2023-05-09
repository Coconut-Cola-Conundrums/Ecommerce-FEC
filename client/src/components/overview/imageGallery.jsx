import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

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

  const onScrollThumbnails = (e) => {
    e.preventDefault();
    console.log(e.target.id)
    let direction = e.target.id === "up" ? 1 : 0;
    console.log(direction)
    if (!direction) { // going down, so moving TO greater indices
      if (thumbnailRange.to <= (currentStyle.photos.length - 1)) { // if we aren't already at the highest index photo
        setThumbnailRange((prevState) => ({...prevState, to: prevState.to+ 1}))
      }
    } else { // going up, so moving FROM a higher index to a lower index of thumbnails to view
      if (thumbnailRange.from > 0) { // aren't already viewing the zeroth thumbnail
        setThumbnailRange((prevState) => ({...prevState, from: prevState.from - 1}))
      }
    }
    console.log(thumbnailRange)
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
            </div>
        : null
      }
    </div>
  )
}

export default ImageGallery