import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const baseAPIURL = "https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/";

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
    axios.get(`${baseAPIURL}/product`).then((res) => {
      axios.get(`${baseAPIURL}/product/${res.data.id}`).then(res => res.data)
    })
  } catch (err) {
    thunkAPI.rejectWithValue(err);
  }
})

export const getSpecificProduct = createAsyncThunk('product/getSpecificProduct', async(id, thunkAPI) => {
  try {
    axios.get(`${baseAPIURL}/product/${id}`).then(res => res.data)
  } catch (err) {
    thunkAPI.rejectWithValue(err);
  }
});

export const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {

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

