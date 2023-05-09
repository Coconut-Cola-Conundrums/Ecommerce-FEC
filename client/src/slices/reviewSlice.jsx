import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const baseAPIURL = "http://localhost:3000/";

const initialState = {
  reviews: [],
  ratings: '',
  recommended: '',
  characteristics: {}
};

export const getReviews = createAsyncThunk('/reviews', async(id, thunkAPI) => {
  return axios.get(`${baseAPIURL}reviews`, {
    params: {
      page: 1,
      count: 5,
      sort: 'newest',
      product_id: id
    }
  }).then((res) => {
    // console.log('The review get request worked:', res.data.results);
    return res.data.results;
  }).catch((err) => {
    console.log('Error when getting Reviews', err);
  })
})

export const getMetaData = createAsyncThunk('/reviews/meta', async(id, thunkAPI) => {
  return axios.get(`${baseAPIURL}reviews/meta`, {
    params: {
      product_id: id
    }
  }).then((res) => {
    // console.log(res.data);
    return res.data;
  }).catch((err) => {
    console.log(err);
  })
})


export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    updateReviews: (state, action) => {
      state.reviews = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.fulfilled, (state, action) => {
        // state = action.payload;
        // console.log('this is the action payload', action.payload)
        state.reviews = action.payload;
      })
      .addCase(getReviews.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getMetaData.fulfilled, (state, action) => {
        state.ratings = action.payload.ratings;
        state.recommended = action.payload.recommended;
        state.characteristics = action.payload.characteristics;
      })
      .addCase(getMetaData.rejected, (state, action) => {
        console.log(action.payload);
      })
  }
})

export const reducers = reviewSlice.actions;