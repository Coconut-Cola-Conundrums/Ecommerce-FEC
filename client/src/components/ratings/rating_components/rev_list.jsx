import React, {useState, useEffect} from 'react';


export const RevList = (props) => {

  return (
    <div>
      <h1>Review List</h1>
      <div >{props.summary.map((rev) => <li key = {rev.review_id}>{rev.summary}</li>)}</div>
    </div>
  )
}