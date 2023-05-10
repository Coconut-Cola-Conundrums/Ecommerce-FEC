const axios = require('axios');
require('dotenv').config();
const URL =  `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp`;

const headers = {
  Authorization: process.env.PAT,
  'Content-Type': 'application/json',
};

module.exports = {
  getReviews: (req, res) => {
    const product_id = req.query.product_id;
    const count = req.query.count;
    const page = req.query.page;
    const sort = req.query.sort;
    console.log(product_id);
    //would need to extract page, count, sort? and product ID from req
    axios.get(`${URL}/reviews/`, { headers, params: {page: page, count: count, sort: sort, product_id: product_id } })
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
    console.log('this is the request for meta data====', req.query.product_id)
    const product_id = req.query.product_id;
    axios.get(`${URL}/reviews/meta`, { headers, params: {product_id: product_id }})
    .then(response => {
      res.json(response)
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
      characteristics: {135219: 4.2}
    };
    console.log(data);
    axios.post(`${URL}/reviews`, data, { headers })
    .then(response => {
      // res.json(response.data);
      console.log('Successfully added review to API', response);
      res.status(201).send('succes');
    })
    .catch(error => {
      console.log('Error adding review to API: ', error);
      res.status(500).send(error);
    });
  },

  putReviewHelpful: (req, res) => {
    //TODO
  },

  putReviewReport:(req, res) => {
    //TODO
  }

};