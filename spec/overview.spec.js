import {render, screen} from '@testing-library/react';
import productSlice, { getInitialData } from '../client/src/slices/productSlice.jsx';
import { useDispatch } from 'react-redux';

const thunkMiddleware = ({ dispatch, getState }) =>
  next =>
  action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    return next(action);
  }

const create = () => {
  const store = {
    getState:  jest.fn(() => ({})),
    dispatch: jest.fn()
  };

  const next = jest.fn();

  const invoke = action => thunkMiddleware(store)(next)(action);

  return { store, next, invoke};
}

describe('testing if async works', () => {
  test('works?', () => {
    const { store, invoke } = create();
    const fn = jest.fn(getInitialData);

    invoke((dispatch, getState) => {
      console.log(dispatch(fn()));
      console.log(getState());
    })

    expect(store.dispatch).toHaveBeenCalled();
  });

});
// test("reducer gets products and sets first object's id to the id in the product state", async() => {
//   expect(productSlice.reducer(getInitialData())).toEqual({
//     id: 40344,
//     productInformation: {

//     },
//     availableStyles: [

//     ],
//     currentStyle: {

//     },
//     isError: false,
//     errorMessage: '',
//     isLoading: false,
//   })
// })