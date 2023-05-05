const axios = require('axios');
const URL =  `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp`;

const headers = {
  Authorization: process.env.PAT,
  'Content-Type': 'application/json',
};

module.exports = {
  getReviews: (req, res) => {
    axios.get(`${URL}/reviews`, { headers })
    .then(response => {
      res.json(response.data);
      console.log('Successful getReviews call to the API');
    })
    .catch(error => {
      console.log('Error fetching reviews from API: ', error);
      res.status(500);
    });
  },

  getMeta: (req, res) => {
    axios.get(`${URL}/reviews/meta`, { headers })
    .then(response => {
      res.json(response.data)
      console.log('successfully retrieved meta data from API')
    })
    .catch(err => {
      console.log('error fetching meta data from the API: ', err);
      res.status(500)
    })
  }

};