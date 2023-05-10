import React,{useState} from 'react';

let QuestionList = ({questions}) => {
// console.log(questions);
  return (
    <div>
      <span>Questions</span>
      {questions.map((question)=>(
        <li key={question.question_id}>
        {question.body}
        </li>
       ))}
    </div>
  );
}

export default QuestionList;