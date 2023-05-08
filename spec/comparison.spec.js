// spec/comparison.spec.js

import { getRelatedIds } from '../client/src/slices/comparisonSlice';
import axios from 'axios';

describe('getRelatedIds', () => {
  // it('returns related IDs successfully', async () => {
  //   const id = 123; // Example ID

  //   // Mock the axios.get() method to return a specific response
  //   jest.spyOn(axios, 'get').mockResolvedValue({ data: [1, 2, 3] });

  //   // Call the getRelatedIds function
  //   const result = await getRelatedIds(id);

  //   // Assertions
  //   expect(result).toEqual([1, 2, 3]);
  //   expect(axios.get).toHaveBeenCalledWith(`http://localhost:3000/products/${id}/related`);
  // });

  it('handles error when fetching related IDs', async () => {
    const id = 123; // Example ID

    // Mock the axios.get() method to throw an error
    jest.spyOn(axios, 'get').mockRejectedValue(new Error('API request failed'));

    // Call the getRelatedIds function
    try {
      await getRelatedIds(id);
    } catch (error) {
      // Assertions
      expect(error.message).toEqual('API request failed');
      expect(axios.get).toHaveBeenCalledWith(`http://localhost:3000/products/${id}/related`);
    }
  });
});
