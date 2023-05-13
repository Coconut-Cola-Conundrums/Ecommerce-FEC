import React,{useState} from 'react';

let QuestionList = ({questions,answers}) => {
  let changeDate = (date) => {
    const dated = new Date(date);
    const formattedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(dated);
    return formattedDate;
  }

  const [showMore, setShowMore] = useState(false);

 let clickHanderAnswers = () => {
    setShowMore(!showMore);
  }

if(questions) {
 //if(questions.length > 1 ) {

  return (
    <div>
      <span>Questions</span>
      {questions.slice(0,4).map((question)=>(
        <div className="questionList" key={question.question_id}>
        <h3>Q: {question.question_body}</h3>

        {answers.slice(0,2).map((answer)=> (
          <div key={answer.answer_id}>
          <h4 className='answer'>A: {answer.body}</h4>
          {answer.photos !== [] ? (
            <div>
            {answer.photos.map((photo)=>(
              <img className='answerImg' key={photo.id} src={photo.url}/>
            ))}
            </div>
          ):(
            <span></span>
          )}
          <span>by {answer.answerer_name}, {changeDate(answer.date)}</span>
          </div>

        ))}
        <div>
          {showMore ? (
            <button onClick={clickHanderAnswers}>Show less</button>
          ):(
            <button onClick={clickHanderAnswers}>Show more answers</button>
            )}
            </div>
        </div>
       ))}
    </div>
  )
      } else {
        return <h3>** No Questions **</h3>
      }
  //}
}

export default QuestionList;