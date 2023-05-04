import { createSlice, createAsyncThunk } from '@redux/toolkit';
import axios from 'axios';

const initialState = {
  relatedIds: [],
  relatedProducts: [
    {
      id: '',
      name : '',
      slogan: '',
      descriptions: '',
      category: '',
      default_price: '',
      features: []
    }
  ],
  error: null
}

const baseAPIURL = "https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp"

export const getRelatedIds = createAsyncThunk('products/getRelatedIds', async(id, thunkAPI) => {
  try {
    axios.get(`${baseAPIURL}/product/${id}/related`).then(res => res.data)
  } catch (err) {
    thunkAPI.rejectWithValue(err);
  }
});

export const getRelatedProduct = createAsyncThunk('products/getRelatedProduct', async(id, thunkAPI) => {
  try {
    axios.get(`${baseAPIURL}/product/${id}`).then(res => res.data)
  } catch (err) {
    thunkAPI.rejectWithValue(err);
  }
});


export const comparisonSlice = createSlice({
  name: 'relatedItems',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getRelatedIds.fulfilled, (state, action) => {
        state.relatedIds = action.payload
      })
      .addCase(getRelatedIds.rejected, (state, action) => {
        console.log('error with payload: ', action.payload);
        state.error = action.error.message;
      })
      .addCase(getRelatedProduct.fulfilled, (state, action) => {
        state.relatedProducts.push(action.payload);
      })
      .addCase(getRelatedProduct.rejected, (state, action) => {
        console.log('error with payload: ', action.payload);
        state.error = action.error.message;
      })
  }
})


