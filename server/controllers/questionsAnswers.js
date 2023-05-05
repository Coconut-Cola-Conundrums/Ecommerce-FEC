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
  },

  getAnswersById: (req, res) => {
    //TODO
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

