import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

export const SortOptions = () => {
  const [search, setSearch] = useState('');
  const reviews = useSelector(state => state.reviews);
  console.log('search====', reviews)

  var subHandler = () => {

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