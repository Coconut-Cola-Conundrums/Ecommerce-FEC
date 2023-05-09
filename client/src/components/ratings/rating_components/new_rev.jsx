import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
const URL = "http://localhost:3000/";


export const NewRev = () => {
  const product = useSelector(state => state.product);
  const characteristics = useSelector(state => state.reviews.characteristics);
  const [recommend, setRecommend] = useState(false)
  console.log('char===>', Object.values(characteristics))
  var characteristicsArray = Object.values(characteristics);
  var characteristicsObj = {};
  characteristicsArray.forEach((char) => {
    characteristicsObj[char.id] = Number(char.value);
  })
  console.log(characteristicsObj)

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
    }).then((res) => {console.log(res)});
  }


  return (
    <div>
      <form onSubmit = {submitHandler}>
        <input placeholder = 'Name' id = 'name'></input>
        <input placeholder = 'Rating' id = 'rating'></input>
        <input placeholder = 'Body' id = 'body'></input>
        <input placeholder = 'Image URL' id = 'img'></input>
        <input placeholder = 'Email' id = 'email'></input>
        <button type = 'submit'>Submit</button>
        <button onClick = {() => (setRecommend(!recommend))}>Recommend</button>
      </form>
    </div>
  )
}