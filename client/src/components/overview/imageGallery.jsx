import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import { FaArrowCircleLeft, FaArrowCircleRight, FaArrowCircleUp, FaArrowCircleDown } from 'react-icons/fa';

const ImageGallery = () => {
  const product = useSelector((state) => state.product);
  const {currentStyle} = product;

  const [mainPhoto, setMainPhoto] = useState(0);
  const [thumbnailRange, setThumbnailRange] = useState({
    from: 0,
    to: 7
  })

  const onClick = (e) => {
    e.preventDefault();
    let url = e.target.id;
    let photoIndex = currentStyle.photos.findIndex((photo) => photo.thumbnail_url === url)
    setMainPhoto(Number(photoIndex));
  }

  // const onAdjustThumbnails = (dir) => {
  //   // 0 is down, 1 is up. 0 is right, 1 is left. Respective of photo array.
  //   if (!dir) { // going down/right, so moving TO greater indices
  //     if (thumbnailRange.to <= (currentStyle.photos.length - 1)) { // if we aren't already at the highest index photo
  //       setThumbnailRange((prevState) => ({to: prevState.to+ 1, from: prevState.from + 1}))
  //     }
  //   } else { // going up, so moving FROM a higher index to a lower index of thumbnails to view
  //     if (thumbnailRange.from > 0) { // aren't already viewing the zeroth thumbnail
  //       setThumbnailRange((prevState) => ({to: prevState.to - 1, from: prevState.from - 1}))
  //     }
  //   }
  // }

  // const onScrollThumbnails = (e) => {
  //   e.preventDefault();
  //   if (e.target.id === "down") {
  //     onAdjustThumbnails(0);
  //   } else if (e.target.id === "up") {
  //     onAdjustThumbnails(1);
  //   }
  // }

  // const onViewThumbnails = (e) => {
  //   e.preventDefault();
  //   if (e.target.id === "left") { // going left, aka 1
  //     if (mainPhoto) { // main photo is not already at the zeroth thumbnail
  //       let newMain = mainPhoto - 1;
  //       setMainPhoto(newMain);
  //       if (thumbnailRange.from > newMain) {
  //         onAdjustThumbnails(1);
  //       }
  //     }
  //   } else if (e.target.id === "right") { // going right, aka 0
  //     if (mainPhoto < (currentStyle.photos.length - 1)) { // not already viewing the last photo
  //       let newMain = mainPhoto + 1;
  //       setMainPhoto(newMain);
  //       if (thumbnailRange.to < newMain) { // if the thumbnails dont have mainphoto in view
  //         onAdjustThumbnails(0);
  //       }
  //     }
  //   }
  // }

  const onViewThumbnails = (e) => {
    e.preventDefault();
    if (e.target.id === "left") { // go to a lower index photo, ie towards the photo at index 0
      if (mainPhoto) { // not already viewing the zeroth photo (mainPhoto is zero if you're already viewing the zeorth photo)
        let newMain = mainPhoto - 1;
        setMainPhoto(newMain);
        if (thumbnailRange.from > newMain) { // if you're viewing photos 2-8, and want to view photo 1, we need to roll back the thumbnail range
          setThumbnailRange((prevState) => ({from: prevState.from - 1, to: prevState.to - 1}))
        }
      }
    } else if (e.target.id === "right") { // go to a higher index photo, ie towards the photo at currentStyle.photos[mainPhoto].length
      if (mainPhoto < (currentStyle.photos.length - 1)) { // not already viewing the last photo
        let newMain = mainPhoto + 1;
        setMainPhoto(newMain);
        if (thumbnailRange.to < (newMain + 1)) { // if you're viewing photos 1-7 and want to view photo 8, we need to stage forward the thumbnail range
          setThumbnailRange((prevState) => ({from: prevState.from + 1, to: prevState.to + 1}))
        }
      }
    }
  }
  const onScrollThumbnails = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    if (currentStyle.photos) {
      if (mainPhoto > (currentStyle.photos.length - 1)) { // when we change styles, if the new style has less photos than the index we were viewing on the last style, set the main photo to the photo at last index on new style
        console.log('setting a new main photo', )
        setMainPhoto(currentStyle.photos.length - 1);
        // we'd also need to update the thumbnail range accordingly as well
        setThumbnailRange({
          from: (currentStyle.photos.length - 7) > -1 ? currentStyle.photos.length - 7 : 0, // if theres 10 photos, then we'd want to view photos 4-10, but if there's only 5 photos, we want to view photos 0-4
          to: currentStyle.photos.length
        });
      } else if (currentStyle.photos.length < thumbnailRange.to) { // if we are viewing photo 6, with a thumbnail range 6-12, and want to switch to a style with 10 photos, we'd want to view photo 6, with a range of 4-10
        setThumbnailRange({
          from: (currentStyle.photos.length - 7) > -1 ? currentStyle.photos.length - 1 : 0, // if theres 10 photos, then we'd want to view photos 4-10, but if there's only 5 photos, we want to view photos 0-4
          to: currentStyle.photos.length
        });
      } else if ((thumbnailRange.to - thumbnailRange.from) < 7 && currentStyle.photos.length >= 7 ) { // if the old style only had 4 photos, and now we have 8 photos, we should update to view the max 7 photos. This will only happen when we are viewing a photo with 7 or less photos (which wouldn't have had its 'from' or 'to' value changed, as there aren't more photos to scroll through)
        setThumbnailRange({from: 0, to: 7})
      }
    }

  }, [product.id, currentStyle]);

  return (
    <div className="photoContainer">
      {currentStyle.photos && currentStyle.photos[mainPhoto] ?
          <div className="absolute">
            <img className="mainPhoto" src={currentStyle.photos[mainPhoto].url} alt="" />
            <FaArrowCircleUp id="up" className="thumbnailArrow" onClick={onScrollThumbnails} fill="#5f9ea0"/>
            {currentStyle.photos.slice(thumbnailRange.from, thumbnailRange.to).map((photo, index) =>
              <img src={photo.thumbnail_url} alt="" key={index} id={photo.thumbnail_url} onClick={onClick} className={index === mainPhoto ? "thumbnail selected" : "thumbnail"}/>
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