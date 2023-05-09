import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
// import {updateReviews} from 'client/src/slices/reviewSlice.jsx'

export const SortOptions = () => {
  const [search, setSearch] = useState('');
  const reviews = useSelector(state => state.reviews);
  // console.log('search====', reviews)

  var subHandler = () => {
    //change the state.reviews to things that match the search
    console.log('submitted')
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