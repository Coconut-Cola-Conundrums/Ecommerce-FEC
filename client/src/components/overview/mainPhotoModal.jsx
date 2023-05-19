import React, { useRef, useState }from 'react';
import PropTypes from 'prop-types';

const Modal = ({mainPhotoImg, show, onClickZoomPhoto, zoom }) => {
  const imgRef = useRef();
  const [styling, setStyling] = useState({transform: "scale(2.5)", minWidth:"100vw", minHeight: "100vh", cursor: "pointer", position: "fixed", top: "0vh", left: "0vh"})

  const onMouse = (e) => {
    let { innerWidth, innerHeight } = window;
    let { width, height } = imgRef.current.getBoundingClientRect();
    // console.log(width/innerWidth, (height/innerHeight).toFixed(2),
    // (e.clientX/innerWidth * 100 * (width/innerWidth)/2.5).toFixed(2),
    // (((e.clientY/innerHeight) * 100) * (height/innerHeight)/2.5).toFixed(2));
    // console.log((e.clientX/innerWidth).toFixed(2),  (e.clientY/innerHeight).toFixed(2))
    // console.log((width/innerWidth).toFixed(2), (height/innerHeight).toFixed(2), (e.pageX/innerWidth * 100 * (width/innerWidth)/2.5).toFixed(2), (e.pageY/innerHeight * 100 * (height/innerHeight)/2.5).toFixed(2))
    // console.log((e.pageX/innerWidth*100).toFixed(2), (e.pageY/innerHeight*100).toFixed(2), height/innerHeight)
    // console.log(((1/(height/innerHeight)*100) + 100));
    // console.log(e.clientX/innerWidth * 100, width, e.clientY/innerHeight * 100, height)
    let x = (e.clientY/innerHeight * 100 * (height/innerHeight)/2.5);

    // setStyling(prevState => ({...prevState, transformOrigin: `${e.clientX/innerWidth * 100}% ${(e.clientY/innerHeight) * 100}%`}))
    setStyling(prevState => ({...prevState, transformOrigin: `
       ${(e.clientX/innerWidth) * 100 * (width/innerWidth)/2.5}%
       ${x}%`
      }
     ))

    // setStyling(prevState => ({...prevState, transformOrigin: `${(e.pageX/innerWidth) * 100}% ${((e.pageY/innerHeight) * 100)}%`}))
    // setStyling(prevState => ({...prevState, transformOrigin: `${100}% ${117}%`}))
    // setStyling(prevState => ({...prevState, transformOrigin: `${e.clientX/innerWidth * 100}% ${115}%`}))
  }
  //minWidth: "100vw", height:"100vh", objectFit: "cover",

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
