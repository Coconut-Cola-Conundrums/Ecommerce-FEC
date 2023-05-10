import React,{useState} from 'react';

let Search = () => {

  return (
    <div>
      <form >
        <input className='questionSearch' type='text' placeholder='Search for a question...' name='name' />
        <input className='searchButton' type='submit' value='Search' placeholder='Search for a question...' />
      </form>
    </div>
  )
}

export default Search;