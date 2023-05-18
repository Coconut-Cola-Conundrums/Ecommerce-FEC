import React, { useRef, useState }from 'react';
import PropTypes from 'prop-types';

const Modal = ({mainPhotoImg, show, onClickZoomPhoto, zoom }) => {
  const imgRef = useRef();
  const [styling, setStyling] = useState({transform: "scale(2.5)", height: "100vh", width: "100vw", cursor: "pointer", top:"5vh", position: "absolute"})

  const onMouse = (e) => {
    // console.log(e.clientX, e.clientY, imgRef.current.getBoundingClientRect(), e.pageX, e.pageY);
    let { width, height, x, y, right, bottom } = imgRef.current.getBoundingClientRect();
    // console.log('width: ', width, 'height: ', height, 'x:', x, "y:", y, "right:", right, "bottom:", bottom, e.pageX, e.pageY)
    // let newStyle = {transformOrigin: `${(e.clientX - x) / width}% ${(e.clientY - y) / height}%`};
    // console.log(2.5 * 100 * e.pageX/width, 2.5 * 100 * e.pageY/height, e.pageX, e.pageY)
    // console.log(2.5 * (e.clientX - x) / width, "and y transformed is", 2.5 * (e.clientY - y / height))
    // console.log(2.5 * 100 * e.pageX/width,2.5 * 100 * (e.pageY / height))
    // console.log(`${2.5 * 100 * e.pageX/width}vw ${5 + 2.5 * 100 * (e.pageY / height)}vh`)
    // setStyling(prevState => ({...prevState, transformOrigin: `${100}vw ${100}vh`}))
    // setStyling(prevState => ({...prevState, transformOrigin: `${100}% ${100}%`}))
    setStyling(prevState => ({...prevState, transformOrigin: `${5 + 2.5 * 100 * e.pageX/width}vh ${5 + 2.5 * 100 * (e.pageY / height)}vw`}))
    // console.log(2.5 * 100 * (e.pageY -y) / height, 2.5 * 100* (e.pageX - x) /width)
    // setStyling(prevState => ({...prevState, transformOrigin: `${ 2.5 * 100 * (e.pageX - x) /width}vw ${5 + 2.5 * 100 * (e.pageY -y) / height}vh`}))
  }

  if (!show) {
    return null
  }
  return (
      <div className="modal" data-testid="modal">
        {zoom ?
          <img style={styling} src={mainPhotoImg} alt="tracking-mouse" onClick={onClickZoomPhoto} onMouseMove={onMouse} ref={imgRef}/>
          :
          <img
            className="zoomed"
            src={mainPhotoImg}
            alt="click-to-zoom"
            onClick={onClickZoomPhoto}
            // style={{maxHeight: "100%", objectFit: "contain"}}}
            style={{objectFit: "contain"}}
            />}
      </div>
  )
}

Modal.propTypes = {
  mainPhotoImg: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClickZoomPhoto: PropTypes.func.isRequired,
  zoom: PropTypes.bool.isRequired,
}

export default Modal;