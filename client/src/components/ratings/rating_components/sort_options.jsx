import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {reducers} from '../../../slices/reviewSlice.jsx'

export const SortOptions = () => {
  const [search, setSearch] = useState('');
  const reviews = useSelector(state => state.reviews.reviews);
  const dispatch = useDispatch();

  // console.log('search====', reviews)

  var subHandler = (e) => {
    //change the state.reviews to things that match the search
    event.preventDefault();

    var filteredReviews = reviews.filter((rev) => {
      return rev.summary.includes(search) || rev.body.includes(search);
    })
    // console.log( 'filtered reviews=====>', filteredReviews);

    dispatch(reducers.updateReviews(filteredReviews));
    // console.log('submitted')
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