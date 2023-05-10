import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import RelatedItems from '../client/src/components/comparison/RelatedItems.jsx';
import { useSelector, useDispatch } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';

// Mock the useDispatch and useSelector hooks
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// Mock the necessary action creators and selectors
jest.mock('../client/src/slices/comparisonSlice.jsx', () => ({
  getRelatedIds: jest.fn(),
  getOutfit: jest.fn(),
  getProductStyle: jest.fn(),
  getMeta: jest.fn(),
  comparisonSlice: {
    actions: {
      addOutfits: jest.fn(),
    },
  },
}));

// Mock the localStorage functions
jest.mock('../client/src/components/comparison/outfitStorage.js', () => ({
  saveOutfits: jest.fn(),
  grabOutfits: jest.fn(),
}));

describe('RelatedItems', () => {
  test('renders text Related Products and Outfits to the dom', () => {
    // Mock the useSelector hook to return the initial state
    useSelector.mockReturnValueOnce({
      relatedProducts: [],
      outfits: [],
      relatedIds: [],
    });

    render(<RelatedItems />);

    // Verify that the component renders without errors
    expect(screen.getByText('Related Products')).toBeInTheDocument();
    expect(screen.getByText('Your Outfits')).toBeInTheDocument();
  });
});




