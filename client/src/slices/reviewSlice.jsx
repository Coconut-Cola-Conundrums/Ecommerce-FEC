import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const baseAPIURL = "https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/";

const initialState = {
  product_id: '',
  reviews: [],
  recommended: '',
  characteristsics: {
    Size: {
      id: '',
      value: ''
    },
    Width: {
      id: '',
      value: ''
    },
    Comfort: {
      id: '',
      value: ''
    },
  }
};

export const getInitialData = createAsyncThunk('reviews', async(id, thunkAPI) => {
  axios.get(baseAPIURL, {
    params: {
      page: 1,
      count: 5,
      sort: 'newest',
      product_id: id
    }
  }).then((res) => {
    console.log(res.data);
    // set the states with the returned data
  }.catch((err) => {
    console.log(err);
  })
  )
})


const reviewSlice = createSlice({
  name: review,
  initialState,
  reducers: {

  }
})