import { createSlice } from '@redux/toolkit';

const initialState = [
  {
    id: '',
    name : '',
    slogan: '',
    descriptions: '',
    category: '',
    default_price: '',
    features: []
  }
]

export const comparisonSlice = createSlice({
  name: 'relatedItems',
  initialState,
  reducers: {
    update: (state, action) => {
      return action.payload;
    }
  }
})