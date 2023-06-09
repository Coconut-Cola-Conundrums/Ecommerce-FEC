import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getReviews, getMetaData, reducers} from '../../../slices/reviewSlice.jsx'

export const SortOptions = () => {
  const [search, setSearch] = useState('');

  const reviews = useSelector(state => state.reviews.allReviews);
  const dispatch = useDispatch();



  var subHandler = (e) => {
    e.preventDefault();
    //line 15 creates a filtered set of reviews based on the search input
    var filteredReviews = reviews.filter((rev) => {
      return rev.summary.includes(search) || rev.body.includes(search);
    })
    dispatch(reducers.updateReviews(filteredReviews));
  }
  var handleSort = (e) => {
    dispatch(reducers.updateSort(e.target.value));
  }

  return (
    <div id = 'sortContainer' data-testid = 'sortTest'>
      <form onSubmit = {subHandler} id = 'searchForm'>
        <input id = 'inputSearch' placeholder = 'Keyword' onChange = {(e) =>{setSearch(e.target.value)}}></input>
        <button id = 'buttonSearch' >Search</button>
      </form>
      <div id = 'sortSelector'>
        <label id = 'selectLabel'>Sorted by:</label>
        <select id="sort" name="sort" onChange = {handleSort}>
          <option value = 'newest'>Newest</option>
          <option value = 'helpful'>Helpful</option>
          <option value = 'relevant'>Relevant</option>
        </select>
      </div>


    </div>
  )
}