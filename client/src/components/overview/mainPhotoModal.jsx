import React from 'react'

const Modal = ({mainPhotoImg, show}) => {

  if (!show) {
    return null
  }
  return (
    <div className="relative">
      <div className="modal">
        {mainPhotoImg}
      </div>
    </div>
  )
}

// Modal.propTypes = {
//   show: React.PropTypes.boolean.isRequired
// }

export default Modal;