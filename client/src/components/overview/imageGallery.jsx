import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown, FaCaretRight, FaCaretLeft } from 'react-icons/fa';

const ImageGallery = () => {
  // something to keep in mind is that the main photo will directly match the photo's index in the currentStyle.photos array, but the thumbnail range will not necessarily. The thumbnail images are mapped from this range by slicing the original
  // currentStyle.photos array in the manner: currentStyle.photos.slice(thumbnailRange.from, thumbnailRange.to)... and with slicing, the 'to' is EXCLUSIVE (meaning, it does not include the element at the index in the second argument, so the to value needs
  // to be one higher than the index we're actually grabbing the photos from. For example, a currentStyle.photos with length 6 has 6 images that go from index 0 to index 5. This would translate to a thumbnailRange {from: 0, to: 6} to ensure
  // we get a visual of the sixth photo (which is AT index 5).
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
    console.log(url);

    if (url === '0') {
      setMainPhoto(0);
    } else {
      let photoIndex = currentStyle.photos.findIndex((photo) => photo.thumbnail_url === url)
      setMainPhoto(Number(photoIndex));
    }
  }

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
      if (mainPhoto < (currentStyle.photos.length - 1)) { // we are not already viewing the last photo
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
    if (e.target.id === "down") { // scrolling down, to higher indices and away from index 0
      if (thumbnailRange.to < currentStyle.photos.length) { // if thumbnail range is 3 - 8 for a photo array length of 8, then the thumbnail range already includes the last photo. So this is checking that the thumbnail range does NOT already include the last photo
        if (mainPhoto < (thumbnailRange.from + 1)) { // if we are viewing the second photo (index 1) with a thumbnail range 1 - 7, and are going to move to see photos 2 - 8, we need to increase the mainPhoto to view the third photo (index 2)
          setMainPhoto(thumbnailRange.from + 1);
        }
        setThumbnailRange((prevState) => ({from: prevState.from + 1, to: prevState.to + 1})); // and now we can increase the thumbnails in view by shifting everything over by an index
      }
    } else if (e.target.id === "up") { // we are scrolling up, to view lower indices towards index 0
      if (thumbnailRange.from !== 0) { // not already viewing the zeroth photo, ie there are more photos to scroll through
        if (mainPhoto === (thumbnailRange.to - 1)) { // if we are viewing photo at index 7 (the eighth photo) from a thumbnail range 2 - 8, then we are viewing the last photo in that range and when we shift upwards to a range of 1 - 7, we need to view phot at index 6. Remember there's that weird thing where we are indexing differently
          setMainPhoto(thumbnailRange.to - 2);
        }
        setThumbnailRange((prevState) => ({from: prevState.from - 1, to: prevState.to - 1})); // and now we can decrease the thumbnails in view by shifting everything over by an index
      }
    }
  }

  useEffect(() => {
    if (currentStyle.photos) {
      // console.log('in useEffect', 'currentStyle:', currentStyle, 'mainPhoto:', mainPhoto, 'thumbnailRange:', thumbnailRange);
      if (mainPhoto > (currentStyle.photos.length - 1)) { // when we change styles, if the new style has less photos than the index we were viewing on the last style, set the main photo to the photo at the last index on new style
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
      } else if ((thumbnailRange.to - thumbnailRange.from) < 7 && currentStyle.photos.length > (thumbnailRange.to - thumbnailRange.from)) { // if the old style only had 4 photos, and now we have 8 photos, we should update to view the max 7 photos. This will only happen when we are viewing a photo with 7 or less photos (which wouldn't have had its 'from' or 'to' value changed, as there aren't more photos to scroll through)
        setThumbnailRange({from: 0, to: 7})
      }
    }

  }, [product.id, currentStyle]);

  return (
    <div className="photoContainer">
      {currentStyle.photos && currentStyle.photos[mainPhoto] ?
          <div className="absolute">
            <img className="mainPhoto" src={currentStyle.photos[mainPhoto].url || "https://www.warnersstellian.com/Content/images/product_image_not_available.png"} alt="" />
            {thumbnailRange.from !== 0 ? <FaRegArrowAltCircleUp id="up" className="thumbnailArrow up" onClick={onScrollThumbnails} /> : null}
            {currentStyle.photos.slice(thumbnailRange.from, thumbnailRange.to).map((photo, index) =>
              <img className={currentStyle.photos[mainPhoto].thumbnail_url === photo.thumbnail_url ? "thumbnail selected" : "thumbnail"}
                src={photo.thumbnail_url || "https://www.warnersstellian.com/Content/images/product_image_not_available.png"}
                alt="" key={index} id={photo.thumbnail_url ? photo.thumbnail_url : 0}
                onClick={onClick}
                onError={({image})=> {
                  console.log(image);
                  image.onerror = null;
                  image.src="https://www.warnersstellian.com/Content/images/product_image_not_available.png"}
                }
              />
            )}
            {thumbnailRange.to !== currentStyle.photos.length ? <FaRegArrowAltCircleDown className="thumbnailArrow down" id="down" onClick={onScrollThumbnails} /> : null}
            <div className="mainPhotoArrowBox">
              {mainPhoto !== 0 ? <FaCaretLeft className="mainPhotoArrow" style={{float: "left"}} id="left" size="6vh" color="black" onClick={onViewThumbnails} /> : null}
              {mainPhoto !== (currentStyle.photos.length - 1) ? <FaCaretRight className="mainPhotoArrow" id="right" size="6vh" color="black" style={{float:"right", zIndex: "1000"}} onClick={onViewThumbnails}/> : null}
            </div>
          </div>
        : null
      }
    </div>
  )
}

export default ImageGallery

//FaArrowCircleLeft, FaArrowCircleRight, FaArrowCircleUp, FaArrowCircleDown,
// ({image}) => {
//   console.log(image);
//   image.onerror = null;
//   image.src="https://www.warnersstellian.com/Content/images/product_image_not_available.png"}
//FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight,
