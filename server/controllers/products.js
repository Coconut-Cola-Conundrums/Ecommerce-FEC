const axios = require('axios');
cosnt URL =  `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/`;

module.exports = {
  getProducts: (req, res) => {
    axios.get(`${URL}/products`)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error fetching products from API');
    });
  },
  getProductById: (req, res) => {},
  getProductStylesById: (req, res) => {},
  getRelatedProductsById: (req, res) => {},
};
