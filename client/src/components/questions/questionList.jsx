import React,{useState} from 'react';


let QuestionList = ({questions,answers}) => {

console.log(questions);
console.log(answers);
  let changeDate = (date) => {
    const dated = new Date(date);
    const formattedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(dated);
    return formattedDate;
  }

  const [showMore, setShowMore] = useState([]);
  let counter = 0;

 let clickHanderAnswers = () => {


  }


  return (
    <div className='QuestionsBox' data-testid="question">
      {questions.map((question)=>(
        <div className="questionList" key={question.question_id}>
          <span className='qHeader'>Q: {question.question_body}</span>
          <button className='qbutton'>Helpful?</button>
          |
          <button className='qbutton'>Add an Answer</button>

          {answers.map((answer)=> (
          <div key={answer.answer_id}>
            <h3 className='answer'>A: {answer.body}</h3>
              <div>
              {answer.photos.map((photo)=>(
              <img className='answerImg' key={photo.id} src={photo.url}/>
              ))}
            </div>

          <span className='credits'>by {answer.answerer_name}, {changeDate(answer.date)}</span>
          <button className='abutton' >Helpful?</button>
          |
          <button className='abutton'>Report</button>
          <hr></hr>
          </div>

        ))}
        <div>
          {showMore ? (
            <button className="click" onClick={clickHanderAnswers}>Show less</button>
          ):(
            <button className="click" onClick={clickHanderAnswers}>Show more answers</button>
            )}
            </div>
        </div>
       ))}
    </div>
  )
  }


export default QuestionList;