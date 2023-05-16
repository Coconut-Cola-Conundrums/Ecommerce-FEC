import React,{useState} from 'react';

let Search = () => {

  const [filter, setFilter] = useState([]);

let submitHandler = () => {



}


  return (
    <div>
      <form >
        <input className='questionSearch' type='text' placeholder='Have a question? Search for answers…' name='name' />
        <input className='searchButton' type='submit' value='Search' />
      </form>
    </div>
  )
}

export default Search;