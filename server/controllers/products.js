const axios = require('axios');
require('dotenv').config();
const URL =  `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp`;

const headers = {
  Authorization: process.env.PAT,
  'Content-Type': 'application/json',
};

module.exports = {
  getProducts: (req, res) => {
    //would need to extract page and count from req and include it as a parameter inside the URL
    axios.get(`${URL}/products`, { headers })
    .then(response => {
      res.json(response.data);
      console.log('Successful getProducts call to the API');
    })
    .catch(error => {
      console.log('Error fetching products from API: ', error);
      res.status(500);
    });
  },

  getProductById: (req, res) => {
    const productId = req.params.product_id;
    axios.get(`${URL}/products/${productId}`, { headers })
      .then(response => {
        res.json(response.data);
        console.log(`Sucessfully fetched product data with ID ${productId}`);
      })
      .catch(error => {
        console.log(`Error fetching product with ID ${productId}`, error);
        res.status(500)
      });
  },

  getProductStylesById: (req, res) => {
    const productId = req.params.product_id;
    axios.get(`${URL}/products/${productId}/styles`, { headers })
      .then(response => {
        res.json(response.data);
        console.log(`Sucessfully fetched style data from product ID ${productId}`);
      })
      .catch(error => {
        console.log(`Error fetching style data with ID ${productId}`, error);
        res.status(500)
      });
  },

  getRelatedProductsById: (req, res) => {
    const productId = req.params.product_id;
    axios.get(`${URL}/products/${productId}/related`, { headers })
      .then(response => {
        res.json(response.data);
        console.log(`Sucessfully fetched related products from product ID ${productId}`);
      })
      .catch(error => {
        console.log(`Error fetching related products from ID ${productId}`, error);
        res.status(500)
      });
  }
};
