import React,{useState} from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';


let QuestionList = ({questions,answers}) => {

  const product = useSelector(state => state.product);
  const {productInformation} = product;

// console.log(questions);
// console.log(answers);
  let changeDate = (date) => {
    const dated = new Date(date);
    const formattedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(dated);
    return formattedDate;
  }

  const [showMore, setShowMore] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [amodalState, setaModal] = useState(false);
  let counter = 0;

 let clickHanderAnswers = () => {
  setShowMore(!showMore);
  }

  const closeModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setModalState(false);
  };

  const closeAModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setaModal(false);
  };


  return (
    <div className='QuestionsBox' data-testid="question">
      {questions.slice(0,4).map((question)=>(
        <div className="questionList" key={question.question_id}>
          <span className='qHeader'>Q: {question.question_body}</span>
          <button className='qbutton'>Helpful?</button>
          |
          <button className='qbutton' onClick={()=>{
      setaModal(true);
    }}>Add an Answer</button>
          <Modal
          isOpen={amodalState}
          onRequestClose={closeAModal}
          contentLabel="Add Answers Modal"
          ariaHideApp={false}
          // style={modalStyles}
          data-testid="modal">
          <div className="modalContainer">
          <h1>Submit Your Answer</h1>
          <h3>{productInformation.name} : {question.question_body}</h3>
          <form>
          <div style = {{display: "flex", backgroundColor: 'white'}}>
            <b style = {{padding: "5px"  }}>What is your nickname *</b>
            </div>
            <input placeholder = 'Example: jackson11!' id = 'name'></input>
            <div style = {{display: "flex", backgroundColor: 'white'}}>
              <b style = {{padding: "5px"  }}>Your Answer *</b>
            </div>
            <textarea placeholder = 'Enter your answer...' id = 'txtbody'></textarea>
          <div style = {{display: "flex", backgroundColor: 'white'}}> Your Email *</div>
            <input placeholder = 'Example: jack@email.com' id = 'email'></input>
              <button id = 'subButton' type = 'submit' data-testid = 'submitTest'>Submit</button>
          </form>
          </div>
        </Modal>

          {answers.slice(0,2).map((answer)=> (
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
       <button className='questbutton' onClick={()=>{
      setModalState(true);
    }}>Add a Question</button>
    <Modal
          isOpen={modalState}
          onRequestClose={closeModal}
          contentLabel="Add Questions Modal"
          ariaHideApp={false}
          // style={modalStyles}
          data-testid="modal">
          <div className="modalContainer">
          <h2>Q & A</h2>
          <h1>Ask Your Question</h1>
          <h3>About The {productInformation.name}</h3>
          <form>
          <div style = {{display: "flex", backgroundColor: 'white'}}>
            <b style = {{padding: "5px"  }}>What is your nickname *</b>
            </div>
            <input placeholder = 'Example: jackson11!' id = 'name'></input>
            <div style = {{display: "flex", backgroundColor: 'white'}}>
              <b style = {{padding: "5px"  }}>Your Question *</b>
            </div>
            <textarea placeholder = 'Enter your question...' id = 'txtbody'></textarea>
          <div style = {{display: "flex", backgroundColor: 'white'}}> Your Email *</div>
            <input placeholder = 'Email' id = 'email'></input>
              <button id = 'subButton' type = 'submit' data-testid = 'submitTest'>Submit</button>
          </form>
          </div>
        </Modal>
    </div>
  )
  }


export default QuestionList;