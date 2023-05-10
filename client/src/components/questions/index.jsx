import React,{useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getQuestions, getAnswers} from '../../slices/questionSlice.jsx'; //import getProductStyles
import QuestionList from './questionList.jsx';
import Search from './search.jsx';

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
    let answers = useSelector((state) => state.questions.answers);




    //everytime the id changes, we will get use the newID to dispatch the 2 async thunks to update our relatedProducts
  //if related product conditional
  useEffect(() => {
    if (product) {
      dispatch(getQuestions(product))
      .then(() => {
       // console.log('questions: ', questions)
        answers = questions.answers;
      })
      .catch(()=>{console.log('err')});
    }}, [product])

  useEffect(()=> {
    const result = questions.results;
    //console.log(questions);
        result.forEach((question) => {
          //console.log('Answer: ', question)
          dispatch(getAnswers(question.question_id));

        });
  },[questions.results]);

  //console.log('Results Array---',questions.results);
  //console.log('Answers---', answers);
  //console.log(product);
  return (
    <div>
    <h2>Questions & Answers</h2>
    <Search />
    <QuestionList questions={questions.results} answers={answers}/>
     </div>
  )
  }

export default Questions;