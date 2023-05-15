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

  return (
    <div className='QuestionsBox'>
      {questions.slice(0,4).map((question)=>(
        <div className="questionList" key={question.question_id}>
        <h2>Q: {question.question_body}</h2>
        <button className='helpful'>Helpful?</button>

        {answers.slice(0,2).map((answer)=> (
          <div key={answer.answer_id}>
          <h3 className='answer'>A: {answer.body}</h3>
          {answer.photos !== [] ? (
            <div>
            {answer.photos.map((photo)=>(
              <img className='answerImg' key={photo.id} src={photo.url}/>
            ))}
            </div>
          ):(
            <span></span>
          )}
          <span className='credits'>by {answer.answerer_name}, {changeDate(answer.date)}</span>
          <button>Helpful?</button>
          <button>Report</button>
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
  }


export default QuestionList;