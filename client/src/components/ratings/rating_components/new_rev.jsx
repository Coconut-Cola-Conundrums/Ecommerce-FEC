import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import {useSelector} from 'react-redux';
const URL = "http://localhost:3000/";


export const NewRev = () => {
  const product = useSelector(state => state.product);
  const characteristics = useSelector(state => state.reviews.characteristics);
  const [recommend, setRecommend] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [rating, setRating] = useState('');
  // console.log(characteristics);
  // var characteristicsArray = Object.values(characteristics);
  var characteristicsObj = {};
  // characteristicsArray.forEach((char) => {
  //   characteristicsObj[char.id] = Number(char.value);
  // })


  var submitHandler = (e) => {
    e.preventDefault();
    // console.log('subhandler')
    var name = e.target.querySelector('#name').value;

    var body = e.target.querySelector('#txtbody').value;
    var summary = body.slice(0, 10) + '...';
    var img = e.target.querySelector('#img').value;
    var email = e.target.querySelector('#email').value;

    axios.post(`${URL}reviews`, {
      product_id: product.id,
      rating: rating,
      summary: summary,
      body: body,
      recommend: recommend,
      name: name,
      email: email,
      photos: [img],
      characteristics: characteristicsObj
    }).then((res) => {console.log('success')})
    .catch((err) => {alert('Input is invalid')});
    setModalState(!modalState)
  }

  const modalStyles = {
    overlay: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      position: 'auto',
      width: '725px',
      height: '400px',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '4px'
    }
  }


  var handleClick = ( id, value) => {
    event.preventDefault()
    var button = document.getElementById(`${value}${id}`)
    var options = [1,2,3,4,5];
    options.forEach((option) => {
      if (value !== option) {
      var opt = document.getElementById(`${option}${id}`)
      opt.style.backgroundColor = '#eee';
      }
    })
    button.style.backgroundColor = 'grey';
    characteristicsObj[id] = value;
    // console.log(characteristicsObj)
  }

  var handleRating = (int) => {
    event.preventDefault();
    var ratingButton = document.getElementById(`${int}`);
    var options = [1,2,3,4,5];
    options.forEach((option) => {
      if (int !== option) {
      var opt = document.getElementById(`${option}`)
      opt.style.backgroundColor = '#eee';
      }
    })
    ratingButton.style.backgroundColor = 'grey';
    setRating(int);
  }

  var recommendHandler = (e) => {
    e.preventDefault();
    var recommendButton = document.getElementById('recommend');
    if (recommend === false) {
      recommendButton.style.backgroundColor = '#BCE5B5'
      recommendButton.style.color = 'black';
    } else {
      recommendButton.style.backgroundColor = '#4e4e4e'
      recommendButton.style.color = 'white';

    }
    setRecommend(!recommend);
  }

  return (
    <div>
      <button id = 'createReview' onClick = {() => {setModalState(!modalState)}}data-testid = 'newRev'>Create Review!</button>
        <Modal
                  isOpen= {modalState}
                  onRequestClose={() => {setModalState(false)}}
                  contentLabel="Product Details Modal"
                  ariaHideApp={false}
                  style={modalStyles}>
                    <h1>New Review</h1>
          <form onSubmit = {submitHandler} id = 'review-form' data-testid = 'reviewForm'>
            <button id = 'recommend' onClick = {recommendHandler}>Recommend</button>
            <input placeholder = 'Name' id = 'name'></input>
            <div >Rating
                  <button id = '1' onClick = {() => {handleRating(1)}}>One</button>
                  <button id = '2' onClick = {() => {handleRating(2)}}>Two</button>
                  <button id = '3' onClick = {() => {handleRating(3)}}>Three</button>
                  <button id = '4' onClick = {() => {handleRating(4)}}>Four</button>
                  <button id = '5' onClick = {() => {handleRating(5)}}>Five</button>
                </div>
            <input placeholder = 'Body' id = 'txtbody'></input>
            <input placeholder = 'Image URL' id = 'img'></input>
            <input placeholder = 'Email' id = 'email'></input>

            {Object.keys(characteristics).map((char) => {
              var charId = characteristics[char].id
              return (
                <div key = {char}>{char}
                  <button id = {'1' + charId} className = 'charButton' onClick = {() => {handleClick(charId, 1)}}>One</button>
                  <button id = {'2' + charId} className = 'charButton'  onClick = {() => {handleClick(charId, 2)}}>Two</button>
                  <button id = {'3' + charId} className = 'charButton'  onClick = {() => {handleClick(charId, 3)}}>Three</button>
                  <button id = {'4' + charId} className = 'charButton'  onClick = {() => {handleClick(charId, 4)}}>Four</button>
                  <button id = {'5' + charId} className = 'charButton'  onClick = {() => {handleClick(charId, 5)}}>Five</button>
                </div>
              )
            })}
            <button id = 'subButton' type = 'submit' data-testid = 'submitTest'>Submit</button>
          </form>
        </Modal>
    </div>
  )
}