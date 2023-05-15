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
    // console.log('this is the sort===>', req.query.sort);
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
    // console.log('this is the request for meta data====', req.query.product_id)
    const product_id = req.query.product_id;
    axios.get(`${URL}/reviews/meta`, { headers, params: {product_id: product_id }})
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
    // console.log('postReview Request====>',req.body)
    axios.post(`${URL}/reviews`, req.body, {headers})
    .then(response => {
      res.sendStatus(201);
      console.log('Successfully added review to API');
    })
    .catch(error => {
      console.log('Error adding review to API: ', error.response);
      res.sendStatus(500);
    });
  },

  putReviewHelpful: (req, res) => {
    console.log('helpful')
    var reviewId = req.params.review_id;
    console.log(reviewId);

    axios.put(`${URL}/reviews/${reviewId}/helpful`,{review_id: reviewId}, {headers})
    .then((response) => {
      // console.log(response);
      res.sendStatus(204);
    })
    .catch(err => {
      console.log(err);
    })
  },

  putReviewReport:(req, res) => {
    //TODO
    console.log('report')
    var reviewId = req.params.review_id;
    console.log(reviewId)

    axios.put(`${URL}/reviews/${reviewId}/helpful`,{review_id: reviewId}, {headers})
    .then((response) => {
      res.sendStatus(204);
    })
    .catch(err => {
      console.log(err)
    })
  }

};