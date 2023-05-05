require('dotenv').config();
const path = require('path');
const { getProducts, getProductById, getProductStylesById, getRelatedProductsById } = require('./controllers/products.js');
const { getReviews, getMeta } = require('./controllers/reviews.js');


const express = require('express');
const morgan = require('morgan');


const app = express();
app.use(morgan('dev'));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(path.join(__dirname, '../client/dist')));

const router = express.Router();
app.use(router);

//overview related routes
router.get('/products', getProducts);
router.get('/products/:product_id', getProductById);
router.get('/products/:product_id/styles', getProductStylesById);
router.get('/products/:product_id/related', getRelatedProductsById);

//reviews related routes
router.get('/reviews', getReviews);
router.get('/reviews/meta', getMeta);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server available at http://localhost:${PORT}`);
});
