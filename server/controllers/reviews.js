const axios = require('axios');
require('dotenv').config();
const URL =  `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp`;

const headers = {
  Authorization: process.env.PAT,
  'Content-Type': 'application/json',
};

module.exports = {
  getReviews: (req, res) => {
    //would need to extract page, count, sort? and product ID from req 
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
  },

  postReview: (req, res) => {
    const data = {
      product_id: req.body.product_id,
      rating: req.body.rating,
      summary: req.body.summary,
      body: req.body.body,
      recommend: req.body.recommend,
      name: req.body.name,
      email: req.body.email,
      photos: req.body.photos,
      characteristics: req.body.characteristics
    };

    axios.post(`${URL}/reviews`, data, { headers })
    .then(response => {
      res.json(response.data);
      console.log('Successfully added review to API');
    })
    .catch(error => {
      console.log('Error adding review to API: ', error);
      res.status(500);
    });
  },

  putReviewHelpful: (req, res) => {
    //TODO
  },

  putReviewReport:(req, res) => {
    //TODO
  }

};