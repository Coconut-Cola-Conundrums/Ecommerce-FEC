import React, {useState, useEffect} from 'react';
import {Stars} from './stars.jsx';
import {useSelector} from 'react-redux';

export const RevList = (props) => {
  const reviews = useSelector(state => state.reviews);


  return (
    <div>
      <h1>Review List</h1>
      <div>
        {reviews.reviews.map((rev) =>
        <div key = {rev.review_id}><Stars rating = {rev.rating}/>
        <p>From: {rev.reviewer_name} Date: {rev.date}</p>
        Summary: {rev.summary}
        <p>{rev.body}</p>
        {rev.photos.map((photo) => {
          // eslint-disable-next-line react/jsx-key
          return <img src = {photo.url} width = '150'/>
        })}

        </div>)}
      </div>
    </div>
  )
}