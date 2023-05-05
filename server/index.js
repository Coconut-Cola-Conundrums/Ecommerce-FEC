require('dotenv').config();
const path = require('path');
const { getProducts, getProductById, getProductStylesById, getRelatedProducts } = require('./controllers');


const express = require('express');
const morgan = require('morgan');


const app = express();
app.use(morgan('dev'));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(path.join(__dirname, '../client/dist')));

const router = express.Router();
app.use(router);

router.get('/products', getProducts);
router.get('/products/:product_id', getProductById);
router.get('/products/:product_id/styles', getProductStylesById);
router.get('/products/:product_id/related', getRelatedProductsById);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server available at http://localhost:${PORT}`);
});
