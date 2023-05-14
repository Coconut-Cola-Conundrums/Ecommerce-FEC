import React, {useState, useEffect} from 'react';
import {Stars} from './stars.jsx';
import {useSelector} from 'react-redux';
import axios from 'axios';

var URL = 'http://localhost:3000';

export const RevList = () => {
  const reviews = useSelector(state => state.reviews);
  console.log(reviews)

  var helpfulHandler = (e, id) => {
    e.preventDefault();
    axios.put(`${URL}/reviews/${id}/helpful`)
    .then( (res) => {
      console.log('was helpful');
    })
    .catch(err => {
      console.log(err);
    })
  }

  var reportHandler = (e) => {
    e.preventDefault();


  }


  return (
    <div>
      <h1 id = 'revListHeader'>Review List</h1>
      <div >
        {reviews.reviews.map((rev) =>
        <div  className = 'reviewContainer' key = {rev.review_id}><Stars rating = {rev.rating}/>
          <div>
            From: <p className = 'user'>{rev.reviewer_name}</p>
            Date: <p className = 'date'>
              {(() => {
              const date = new Date(rev.date);
              const options = {year: 'numeric', month: 'long', day: 'numeric' };
              const readableDate = date.toLocaleDateString('en-US', options);
              return readableDate
              })()}</p>
              <div>
                {(() => {
                  if (rev.recommend) {
                    return <b>I recommend this product!<i className="fas fa-check"/></b>
                  }
                })()}
              </div>
          </div>
            Summary: {rev.summary}
          <p className = 'body'>
            {rev.body}
          </p>
          {rev.photos.map((photo) => {
          // eslint-disable-next-line react/jsx-key
          return <img key = {photo.url} src = {photo.url} width = '150'/>
          })}
          <button onClick = {(event) => {helpfulHandler(event, rev.review_id)}}>Helpful</button>
          <button onClick = {reportHandler}>Report</button>
        </div>)}
      </div>
    </div>
  )
}