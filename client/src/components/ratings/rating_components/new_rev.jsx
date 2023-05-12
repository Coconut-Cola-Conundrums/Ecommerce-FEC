import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import {useSelector} from 'react-redux';
const URL = "http://localhost:3000/";


export const NewRev = () => {
  const product = useSelector(state => state.product);
  const characteristics = useSelector(state => state.reviews.characteristics);
  const [recommend, setRecommend] = useState(false)
  const [modalState, setModalState] = useState(false);

  var characteristicsArray = Object.values(characteristics);
  var characteristicsObj = {};
  characteristicsArray.forEach((char) => {
    characteristicsObj[char.id] = Number(char.value);
  })


  var submitHandler = (e) => {
    e.preventDefault();
    var name = e.target.querySelector('#name').value;
    var rating = Number(e.target.querySelector('#rating').value);
    var body = e.target.querySelector('#body').value;
    var summary = body.slice(0, 10) + '...';
    var img = e.target.querySelector('#img').value;
    var email = e.target.querySelector('#email').value;

    axios.post(`${URL}reviews`, {
      product_id: product.id,
      rating: rating,
      summary: summary,
      body: body,
      recommend: true,
      name: name,
      email: email,
      photos: [img],
      characteristics: characteristicsObj
    }).then((res) => {console.log(res)})
    .catch(alert('Input is invalid'));
  }

  const modalStyles = {
    overlay: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      position: 'auto',
      width: '500px',
      height: '400px',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '4px'
    }
  }


  return (
    <div>
      <button onClick = {() => {setModalState(!modalState)}}>Create Review!</button>
        <Modal
                  isOpen= {modalState}
                  onRequestClose={() => {setModalState(false)}}
                  contentLabel="Product Details Modal"
                  ariaHideApp={false}
                  style={modalStyles}>
          <form onSubmit = {submitHandler} id = 'review-form'>
            <button type = 'submit'>Submit</button>
            <button onClick = {() => (setRecommend(!recommend))}>Recommend</button>
            <input placeholder = 'Name' id = 'name'></input>
            <input placeholder = 'Rating' id = 'rating'></input>
            <input placeholder = 'Body' id = 'body'></input>
            <input placeholder = 'Image URL' id = 'img'></input>
            <input placeholder = 'Email' id = 'email'></input>
          </form>
        </Modal>
    </div>
  )
}