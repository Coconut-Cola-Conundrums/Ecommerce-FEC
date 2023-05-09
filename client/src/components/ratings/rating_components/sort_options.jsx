import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getReviews, getMetaData, reducers} from '../../../slices/reviewSlice.jsx'

export const SortOptions = () => {
  const [search, setSearch] = useState('');
  const reviews = useSelector(state => state.reviews.allReviews);
  const dispatch = useDispatch();



  var subHandler = (e) => {
    event.preventDefault();
    //line 15 creates a filtered set of reviews based on the search input
    var filteredReviews = reviews.filter((rev) => {
      return rev.summary.includes(search) || rev.body.includes(search);
    })

    dispatch(reducers.updateReviews(filteredReviews));
  }

  return (
    <div>
      <form onSubmit = {subHandler}>
        <input placeholder = 'Keyword' onChange = {(e) =>{setSearch(e.target.value)}}></input>
        <button>Search</button>
      </form>
    </div>
  )
}