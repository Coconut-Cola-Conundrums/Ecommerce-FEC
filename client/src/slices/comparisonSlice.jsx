import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
  productStyles: [],
  error: null
}

const baseAPIURL = "http://localhost:3000"

export const getRelatedIds = createAsyncThunk('products/getRelatedIds', async(id, thunkAPI) => {
  try {
    axios.get(`${baseAPIURL}/products/${id}/related`).then(res => res.data)
  } catch (err) {
    thunkAPI.rejectWithValue(err);
  }
});

export const getRelatedProduct = createAsyncThunk('products/getRelatedProduct', async(id, thunkAPI) => {
  try {
    axios.get(`${baseAPIURL}/products/${id}`).then(res => res.data)
  } catch (err) {
    thunkAPI.rejectWithValue(err);
  }
});

//need another aysnc thunk func to axios.get /products/:product_id/styles and store it into your slice
export const getProductStyle = createAsyncThunk('/products/getProductStyle', async(id, thunkAPI) => {
  try {
    axios.get(`${baseAPIURL}/products/${id}/styles`).then(res => res.data)
  } catch (err) {
    thunkAPI.rejectWithValue(err);
  }
})


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


