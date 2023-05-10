const axios = require('axios');
require('dotenv').config();
const URL =  `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp`;

const headers = {
  Authorization: process.env.PAT,
  'Content-Type': 'application/json',
};


module.exports = {
  getQuestions: (req, res) => {
    //TODO
    const product_id = 40730;
    const count = req.query.count;
    const page = req.query.page;
    //console.log(req.query);
    //would need to extract page and count from req and include it as a parameter inside the URL
    axios.get(`${URL}/qa/questions`, { headers, params: {product_id: product_id, count:count, page: page } })
    .then(response => {
     // console.log(response);
      res.json(response.data.results);
      console.log('Successful getQuestions call to the API');
    })
    .catch(error => {
      console.log('Error fetching products from API: ', error);
      res.status(500);
    });
  },

  getAnswersById: (req, res) => {
    //TODO
    let question_id = req.params.question_id;
    question_id = Number(question_id);
    const count = req.query.count;
    const page = req.query.page;
    //console.log('params-----',req.params);
    //would need to extract page and count from req and include it as a parameter inside the URL
    axios.get(`${URL}/qa/questions/${question_id}/answers`, { headers, params: {count:count, page: page } })
    .then(response => {
    //  console.log(response.data.results);
      res.json(response.data.results);
      // console.log('Successful getAnswers call to the API');
    })
    .catch(error => {
      console.log('Error fetching products from API: ', error);
      res.status(500);
    });
  },

  postQuestion: (req, res) => {
    //TODO
  },

  postAnswerForQuestionById: (req, res) => {
    //TODO
  },

  putQuestionHelpfulById: (req, res) => {
    //TODO
  },

  putQuestionReportById: (req, res) => {
    //TODO
  },

  putAnswerHelpfulById: (req, res) => {
    //TODO
  },

  putAnswerReportById: (req, res) => {
    //TODO
  }

}

