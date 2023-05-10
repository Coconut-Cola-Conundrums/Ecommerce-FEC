import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const baseAPIURL = "http://localhost:3000";

// important pieces of product state
  // current product overview
  // current product information
  // all styles available
  // current style selected

// when getSpecificProduct is dispatched, the styles also need to be updated, and the current style needs to be set to the zeroth style in the styles array

const initialState = {
  id: null,
  productInformation: {

  },
  availableStyles: [

  ],
  currentStyle: {

  },
  isError: false,
  errorMessage: '',
  isLoading: false,
};

// Retrieves a list of product overview objects. API default query params gets first page and five results. Returns an array of products
export const getInitialData = createAsyncThunk('product/getInitialData', async(_, thunkAPI) => {
  try {
    return axios.get(`${baseAPIURL}/products`)
    .then((res) => res.data)
    .catch((err) => {throw new Error (err)});
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})

// Retrieves a single product object from the path parameter, productId
export const getSpecificProduct = createAsyncThunk('product/getSpecificProduct', async(productId, thunkAPI) => {
  try {
    if (!productId) {
      productId = thunkAPI.getState().product.id;
    }
    return axios.get(`${baseAPIURL}/products/${productId}`)
    .then(res => res.data)
    .catch((err) => {throw new Error (err)});
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

// Retrieves an array of style objects from the path parameter, productId
export const getStyles = createAsyncThunk('product/getStyles', async(productId, thunkAPI) => {
  try {
    if (!productId) {
      productId = thunkAPI.getState().product.id;
    }
    return axios.get(`${baseAPIURL}/products/${productId}/styles`)
    .then(res => res.data)
    .catch((err) => {throw new Error (err)});
  } catch(err) {
    return thunkAPI.rejectWithValue(err);
  }
})

export const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    // When a user clicks on the style to see, the state.currentStyle will be updated
    setCurrentStyle: (state, action) => {
      const id = Number(action.payload);
      // console.log(id)
      const style = state.availableStyles.filter((style) => style.style_id === id);
      // console.log(style);
      if (style.length) {
        state.currentStyle = style[0];
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialData.fulfilled, (state, action) => {
        state.id = action.payload[0].id;
        state.isLoading = false;
      })
      .addCase(getInitialData.rejected, (state, action) => {

        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(getInitialData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })

      .addCase(getSpecificProduct.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.productInformation = action.payload;
        state.availableStyles = [];
        state.currentStyle = {};
        state.isLoading = false;
      })
      .addCase(getSpecificProduct.rejected, (state, action) => {
        state.isError = true;
        state.errorMessage = action.payload;
        state.isLoading = false;
      })
      .addCase(getSpecificProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })

      .addCase(getStyles.fulfilled, (state, action) => {
        state.availableStyles = action.payload.results;
        state.currentStyle = action.payload.results[0];
        state.isLoading = false;
      })
      .addCase(getStyles.rejected, (state, action) => {
        state.isError = false;
        state.errorMessage = action.payload;
        state.isLoading = false;
      })
      .addCase(getStyles.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
  }
})

export const { setCurrentStyle } = productSlice.actions;
