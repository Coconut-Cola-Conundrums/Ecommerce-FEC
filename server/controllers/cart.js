const axios = require('axios');
require('dotenv').config();
const URL =  `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp`;

const headers = {
  Authorization: process.env.PAT,
  'Content-Type': 'application/json',
};

module.exports = {
  getCartByUser: (req, res) => {
    try {
      axios.get(`${URL}/cart`, { headers })
        .then(response => res.status(200).send(response.data))
    } catch (err) {
      res.status(400).send(err);
    }
  },

  addProductToCart: (req, res) => {
    try {
      axios.post(`${URL}/cart`, req.body, { headers })
      .then(response => res.status(201).send(response.data));
    } catch (err) {
      res.status(400).send(err, req.body);
    }
  }
}
