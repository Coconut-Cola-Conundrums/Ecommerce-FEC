import React from 'react';

export default function App() {
  // useEffect cascade of get requests to store state information, using .then() notation
  // if the product state is empty, make get requests to /products and page 1 count 1 to get first product
  // .then => make get requests to /products/:product id for product level information
  // store product information in the state by dispatching a product action

  // make a get request to /products/:product_id/related for array of related item ids
  // .then => for each related item, make a get request to /products/:product_id and update related items state

  // make a get request to /reviews/ with product_id from product state and dispatch the review slice action to update the review state
  // make a get request to /reviews/meta with product_id from product state and dispatch the reivew slice action to update the review state

  // make get request to /qa/questions with product_id from product state and dispatch the questions slice action to update the state of questions
  // .then => foreach question, make a get request to /qa/questions/:question_id/answers and update the question slice action to update the state of questions
  return (
    <div id="App">
      <p>Hello, world!</p>
    </div>
  );
}