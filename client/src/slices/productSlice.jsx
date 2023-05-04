import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
  id: '',
  name : '',
  slogan: '',
  descriptions: '',
  category: '',
  default_price: '',
};

export const getInitialData = createAsyncThunk('product/getInitialData', async(_, thunkAPI) => {
  try {
    axios.get('hackreactorurl/product').then((res) => {
      axios.get(`hackreacturul/product/${res.data.id}`).then(res => res.data)
    })
  } catch (err) {
    throw new Error (err);
  }
})

export const getSpecificProduct = createAsyncThunk('product/getSpecificProduct', async(id, thunkAPI) => {
  try {
    axios.get(`hackreacturul/product/${id}`).then(res => res.data)
  } catch (err) {
    throw new Error (err);
  }
});
export const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    // update to specific product id
    // get initial data (when we don't have any data in the state)
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialData.fulfilled, (state, action) => {
        state = action.payload;
      })
      .addCase(getInitialData.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getSpecificProduct.fulfilled, (state, action) => {
        state = action.payload;
      })
      .addCase(getSpecificProduct.rejected, (state, action) => {
        console.log(action.payload);
      })
  }
})

