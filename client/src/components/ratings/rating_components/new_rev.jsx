import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import {useSelector} from 'react-redux';
import { FaStar, FaRegStar } from 'react-icons/fa'
import Star from '../Images/icons8-star-24.png'
import noStar from '../Images/icons8-star-32.png'
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
      var opt = document.getElementById(`${option}${id}`)
      if (value >= option) {
        opt.style.backgroundColor = 'grey';
      } else {
        opt.style.backgroundColor = '#eee';
      }
    })
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
      <button id = 'createReview' onClick = {() => {
        setModalState(!modalState);
        setRecommend(false);
        setRating(0);
        }}data-testid = 'newRev'>Create Review!</button>
        <Modal
                  isOpen= {modalState}
                  onRequestClose={() => {setModalState(false)}}
                  contentLabel="Product Details Modal"
                  ariaHideApp={false}
                  style={modalStyles}>
                    <h1>New Review</h1>
          <form onSubmit = {submitHandler} id = 'review-form' data-testid = 'reviewForm'>
            <button id = 'recommend' data-testid = 'recommend' onClick = {recommendHandler}>Recommend</button>
            <input placeholder = 'Name' id = 'name'></input>
            <div style = {{display: "flex", backgroundColor: 'white'}} id = 'newStars'>
              <b style = {{padding: "15px 20px"  }}>Rating</b>
                <p id = '1' data-testid = '1' onClick = {() => {handleRating(1)}}>{
                  rating >= 1 ? <img src = {Star} width = '30px' style = {{backgroundColor: 'white'}}/> : <img src = {noStar} width = '30px' />
                }</p>
                <p id = '2' onClick = {() => {handleRating(2)}}>{
                  rating >= 2 ? <img src = {Star} width = '30px' style = {{backgroundColor: 'white'}}/> : <img src = {noStar} width = '30px' style = {{backgroundColor: 'white'}}/>
                }</p>
                <p id = '3' onClick = {() => {handleRating(3)}}>{
                  rating >= 3 ? <img src = {Star} width = '30px' style = {{backgroundColor: 'white'}}/> : <img src = {noStar} width = '30px' style = {{backgroundColor: 'white'}}/>
                }</p>
                <p id = '4' onClick = {() => {handleRating(4)}}>{
                  rating >= 4 ? <img src = {Star} width = '30px' style = {{backgroundColor: 'white'}}/> : <img src = {noStar} width = '30px' style = {{backgroundColor: 'white'}}/>
                }</p>
                <p id = '5' onClick = {() => {handleRating(5)}}>{
                  rating >= 5 ? <img src = {Star} width = '30px' style = {{backgroundColor: 'white'}}/> : <img src = {noStar} width = '30px' style = {{backgroundColor: 'white'}} />
                }</p>
            </div>
            <textarea placeholder = 'Body' id = 'txtbody'></textarea>
            <input placeholder = 'Image URL' id = 'img'></input>
            <input placeholder = 'Email' id = 'email'></input>

            {Object.keys(characteristics).map((char) => {
              var charId = characteristics[char].id

              return (
                <div key = {char}><b id = 'charLabel'>{char}</b>
                  <button id = {'1' + charId} data-testid = {char} className = 'charButton' onClick = {() => {handleClick(charId, 1)}}><FaStar/></button>
                  <button id = {'2' + charId} className = 'charButton'  onClick = {() => {handleClick(charId, 2)}}><FaStar/></button>
                  <button id = {'3' + charId} className = 'charButton'  onClick = {() => {handleClick(charId, 3)}}><FaStar/></button>
                  <button id = {'4' + charId} className = 'charButton'  onClick = {() => {handleClick(charId, 4)}}><FaStar/></button>
                  <button id = {'5' + charId} className = 'charButton'  onClick = {() => {handleClick(charId, 5)}}><FaStar/></button>
                </div>
              )
            })}
            <button id = 'subButton' type = 'submit' data-testid = 'submitTest'>Submit</button>
          </form>
        </Modal>
    </div>
  )
}