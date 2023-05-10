//call to the getinitial data function to check the correct data is being retrieved with a given id
//check if the initial state is updated
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Reviews from '..client/src/components/ratings/index.jsx';
import { useSelector, useDispatch } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-redux', () => {
  useSelector: jest.fn(),
  useDispatch: jest.fn()
})