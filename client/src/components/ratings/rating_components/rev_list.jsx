import React, {useState, useEffect} from 'react';
import {Stars} from './stars.jsx';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {getReviews, getMetaData, reducers} from '../../../slices/reviewSlice.jsx'

var URL = 'http://localhost:3000';

export const RevList = () => {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviews);
  console.log(reviews)


  var helpfulHandler = (e, id) => {
    e.preventDefault();
    var helpfulButton = document.getElementById(`helpful${id}`);
    if (helpfulButton.style.backgroundColor !== '#BCE5B5') {
    axios.put(`${URL}/reviews/${id}/helpful`)
    .then( () => {
      console.log('was helpful');
    })
    .catch(err => {
      console.log(err);
    })
    helpfulButton.style.backgroundColor = '#BCE5B5';
    } else {
      alert("Can mark helpful once")
    }
  }

  var reportHandler = (e, id) => {
    e.preventDefault();
    var reportButton = document.getElementById(`report${id}`);
    if (reportButton.style.backgroundColor !== '#FFA8A6') {
    axios.put(`${URL}/reviews/${id}/report`)
    .then( () => {
      console.log(`${id} was reported`)
    })
    .catch(err => {
      console.log(err);
    })
    reportButton.style.backgroundColor = '#FFA8A6';
  } else {
    alert("Can only report once")
  }
  }

  var showMorehandler = (e) => {
    e.preventDefault();
    var filteredReviews = reviews.allReviews.slice(0, reviews.reviews.length + 2)
    dispatch(reducers.updateReviews(filteredReviews));
  }


  return (
    <div data-testid="review-list-div">
      <h1 id = 'revListHeader'>Review List</h1>
      <div >
        {reviews.reviews.map((rev) =>
        <div  className = 'reviewContainer' key = {rev.review_id}><Stars rating = {rev.rating}/>
          <div>
            From: <p className = 'user'>{rev.reviewer_name} </p>{' '}
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
          <div id = 'putButtons'>
            <button id = {`helpful${rev.review_id}`} className = 'helpful' onClick = {(event) => {helpfulHandler(event, rev.review_id)}}>Helpful</button>
            <button id = {`report${rev.review_id}`} className = 'report' onClick = {(e) => {reportHandler(e, rev.review_id)}}>Report</button>
          </div>
        </div>)}
      </div>
      <button id = 'moreReviews' onClick = {showMorehandler}>Show More Reviews!</button>
    </div>
  )
}