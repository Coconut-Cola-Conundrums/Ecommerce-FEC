import React, {useState, useEffect} from 'react';
import {Stars} from './stars.jsx';
import {useSelector} from 'react-redux';

export const RevList = () => {
  const reviews = useSelector(state => state.reviews);


  return (
    <div>
      <h1>Review List</h1>
      <div >
        {reviews.reviews.map((rev) =>
        <div  className = 'reviewContainer' key = {rev.review_id}><Stars rating = {rev.rating}/>
          <div>
            From: <p className = 'user'>{rev.reviewer_name}</p> Date: {(() => {
              const date = new Date(rev.date);
              const options = {year: 'numeric', month: 'long', day: 'numeric' };
              const readableDate = date.toLocaleDateString('en-US', options);
              return readableDate
              })()}
          </div>
            Summary: {rev.summary}
          <p className = 'body'>
            {rev.body}
          </p>
          {rev.photos.map((photo) => {
          // eslint-disable-next-line react/jsx-key
          return <img key = {photo.url} src = {photo.url} width = '150'/>
          })}
        </div>)}
      </div>
    </div>
  )
}