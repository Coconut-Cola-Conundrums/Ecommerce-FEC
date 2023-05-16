import React,{useState} from 'react';

let QuestionList = ({questions,answers}) => {
  let changeDate = (date) => {
    const dated = new Date(date);
    const formattedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(dated);
    return formattedDate;
  }

  const [showMore, setShowMore] = useState([]);

 let clickHanderAnswers = () => {
    setShowMore(!showMore);
  }

//if(questions) {
  //setShowMore(questions);
  return (
    <div className='QuestionsBox' data-testid="question">
      {questions.slice(0,4).map((question)=>(
        <div className="questionList" key={question.question_id}>
        <span className='qHeader'>Q: {question.question_body}</span>
        <button>Helpful?</button>
        |
        <button>Add an Answer</button>

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
    //   } else {
    //     return <h3>** No Questions **</h3>
    //   }
  }


export default QuestionList;