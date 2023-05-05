require('dotenv').config();
const path = require('path');

const { getProducts, getProductById, getProductStylesById, getRelatedProductsById } = require('./controllers/products.js');

const { getReviews, getMeta, postReview, putReviewHelpful, putReviewReport } = require('./controllers/reviews.js');

const { getQuestions, getAnswersById, postQuestion, postAnswerForQuestionById, putQuestionHelpfulById, putQuestionReportById, putAnswerHelpfulById, putAnswerReportById } = require('./controllers/questionsAnswers');

const { getCartByUser, addProductToCart } = require('./controllers/cart.js');


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
router.post('/reviews', postReview);
router.put('/reviews/:review_id/helpful', putReviewHelpful);
router.put('/reviews/:review_id/report', putReviewReport);

//Questions and answers related routes
router.get('/qa/questions', getQuestions);
router.get('/qa/questions/:question_id/answers', getAnswersById);
router.post('/qa/questions', postQuestion);
router.post('/qa/questions/:question_id/answers', postAnswerForQuestionById);
router.put('/qa/questions/:question_id/helpful', putQuestionHelpfulById);
router.put('/qa/questions/:question_id/report', putQuestionReportById);
router.put('/qa/answers/:answer_id/helpful', putAnswerHelpfulById);
router.put('/qa/answers/:answer_id/report', putAnswerReportById);

//cart related routes
router.get('/cart', getCartByUser);
router.post('/cart', addProductToCart);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server available at http://localhost:${PORT}`);
});
