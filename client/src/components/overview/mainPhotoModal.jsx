import React, { useRef, useState }from 'react';
import PropTypes from 'prop-types';

const Modal = ({mainPhotoImg, show, onClickZoomPhoto, zoom }) => {
  const imgRef = useRef();
  const [styling, setStyling] = useState({transform: "scale(2.5)",cursor: "pointer", top:"5vh", position: "absolute", width: "100vw", minHeight:"100vh",transformOrigin: "center"})

  const onMouse = (e) => {
    let { innerWidth: width, innerHeight: height } = window;
    // let { imageWidth, imageHeight, left, top } = imgRef.current.getBoundingClientRect();
    console.log(e.clientX/innerWidth * 100, width, e.clientY/innerHeight * 100, height)
    setStyling(prevState => ({...prevState, transformOrigin: `${e.clientX/innerWidth * 100}% ${5 + (e.clientY/innerHeight * 100)}%`}))

  }

  if (!show) {
    return null
  }
  return (
      <div className="modal" data-testid="modal">
        {zoom ?
          <img
            style={styling}
            src={mainPhotoImg}
            alt="tracking-mouse"
            onClick={onClickZoomPhoto}
            onMouseMove={onMouse}
            ref={imgRef}
          />
          :
          <img
            className="zoomed"
            src={mainPhotoImg}
            alt="click-to-zoom"
            onClick={onClickZoomPhoto}
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
