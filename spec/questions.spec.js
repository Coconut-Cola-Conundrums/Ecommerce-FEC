import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import QuestionList from '../client/src/components/questions/questionList.jsx';

const mockStore = configureStore([]);

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

  it(' should render render questions list', () => {
    render(
      <Provider store={store}>
        <QuestionList />
      </Provider>
    );
      console.log(screen);
    expect(screen.getByText('Questions')).toBeInTheDocument();
  });


it('should render a populated div', () => {
  const { getByTestId } = render(
    <Provider store = {store}>
      <QuestionList/>
    </Provider>)
  ;
  const divElement = getByTestId('g');
  expect(divElement).toBeInTheDocument();
});

});
