import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const baseAPIURL = "https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/";

// important pieces of product state
  // current product overview
  // current product information
  // all styles available
  // current style selected

// when getSpecificProduct is dispatched, the styles also need to be updated, and the current style needs to be set to the zeroth style in the styles array

const initialState = {
  productOverview: {

  },
  productInformation: {

  },
  availableStyles: {

  },
  currentStyle: {

  },
  isError: false,
};

// Retrieves a list of products. API default query params gets first page and five results. Returns an array of products
export const getInitialData = createAsyncThunk('product/getInitialData', async(_, thunkAPI) => {
  try {
    axios.get(`${baseAPIURL}/products`).then((res) => res.data);
  } catch (err) {
    thunkAPI.rejectWithValue(err);
  }
})

export const getSpecificProduct = createAsyncThunk('product/getSpecificProduct', async(productId, thunkAPI) => {
  try {
    axios.get(`${baseAPIURL}/product/${productId}`).then(res => res.data)
  } catch (err) {
    thunkAPI.rejectWithValue(err);
  }
});

export const getStyles = createAsyncThunk('product/getStyles', async(productId, thunkAPI) => {
  try {
    axios.get(`${baseAPIURL}/products/${productId}/styles`).then(res => res.data);
  } catch(err) {
    thunkAPI.rejectWithValue(err);
  }
})

export const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialData.fulfilled, (state, action) => {
        // default set
        state.productOverview = action.payload[0];
      })
      .addCase(getInitialData.rejected, (state, action) => {
        console.log(action.payload);
        state.isError = true;
      })
      .addCase(getSpecificProduct.fulfilled, (state, action) => {
        state.productInformation = action.payload;
      })
      .addCase(getSpecificProduct.rejected, (state, action) => {
        console.log(action.payload);
      })
  }
})
