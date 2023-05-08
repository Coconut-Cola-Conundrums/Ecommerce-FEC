import React,{useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getQuestions, getAnswers} from '../../slices/questionSlice.jsx'; //import getProductStyles


let Questions = () => {
  /*
  have questions and answers list
    -have a 'helpful' button that counts the number of clicks
    -add an answer option

  Be able to search questions
    -implementing a search bar

  Having a more questions option since on load there will only be 4

  Adding a question
    -requiring a question, display name, amd email in order
      to submit new questions

  Add an answer model
    -allow a user to answer a question requiring their answer, name, and email
    -all a user to upload a photo
  */

    const dispatch = useDispatch();
    let questions = useSelector((state) => state.questions);
    let product = useSelector((state) => state.product.id);

    //everytime the id changes, we will get use the newID to dispatch the 2 async thunks to update our relatedProducts
  //if related product conditional
  useEffect(() => {
    if (product) {
      dispatch(getQuestions(product))
      .then(() => {
        console.log('questions: ', questions)
        const answers = questions.answers;
        answers.forEach((answer) => {
          console.log('Answer: ', answer)
          dispatch(getAnswers(answer.id));
          //no need to update relatedProducts state here, it's being done in extraReducers once fullfilled
        });
      })
    }
  }, [product])

  console.log(questions);

  return (
    <div> Hello World </div>
  );
}

export default Questions;