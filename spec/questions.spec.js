import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import QuestionList from '../client/src/components/questions/questionList.jsx';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore([]);

const props = {
  questions: [{
    "question_id": 37,
    "question_body": "Why is this product cheaper here than other sites?",
    "question_date": "2018-10-18T00:00:00.000Z",
    "asker_name": "williamsmith",
    "question_helpfulness": 4,
    "reported": false,
    "answers": {
      68: {
        "id": 68,
        "body": "We are selling it here without any markup from the middleman!",
        "date": "2018-08-18T00:00:00.000Z",
        "answerer_name": "Seller",
        "helpfulness": 4,
        "photos": []
      }
    }
  }],
  answers: [{
    "answer_id": 5,
    "body": "Something pretty durable but I can't be sure",
    "date": "2018-01-04T00:00:00.000Z",
    "answerer_name": "metslover",
    "helpfulness": 5,
    "photos": [{
        "id": 1,
        "url": "urlplaceholder/answer_5_photo_number_1.jpg"
      }]
}]
};

describe('QuestionsList', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      questions: {
        results: [],
        answers: [],
        product_id: '',
      },
      product: {
        id: '123',
      },
    });
  });

  // it(' should render render questions list', () => {
  //   render(
  //     <Provider store={store}>
  //       <QuestionList {...props} />
  //     </Provider>
  //   );
  //     console.log(screen);
  //   expect(screen.getByText('Questions')).toBeInTheDocument();
  // });


it('should render a populated div', () => {
  const { getByTestId } = render(
    <Provider store = {store}>
      <QuestionList {...props} />
    </Provider>)
  ;
  const divElement = getByTestId('question');
  expect(divElement).toBeInTheDocument();
});

});
