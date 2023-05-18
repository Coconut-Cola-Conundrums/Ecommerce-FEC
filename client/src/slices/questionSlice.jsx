import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
const baseAPIURL = "http://localhost:3000/";

const initialState = {
  product_id: '',
  results: [],
  answers: [],


};

export const getQuestions = createAsyncThunk('questions/getQuestions', async(id, thunkAPI) => {
  try {
    return axios.get(`${baseAPIURL}qa/questions/`,{
      params: {
        product_id: id,
        page: 1,
        count: 5
      }
    }).then((res) => {
      console.log(res.data);
      return res.data;
    }).catch((err)=>{
      throw new Error (err);
    })
  } catch (err) {
    thunkAPI.rejectWithValue(err);
  }
});

export const getAnswers = createAsyncThunk('questions/getAnswers', async(id, thunkAPI) => {
  try {
   return axios.get(`${baseAPIURL}qa/questions/${id}/answers`,{
    params: {
      page: 1,
      count: 5
    }
    }).then((res) => {
      //console.log(res.data);
      return res.data
    }).catch((err)=> {
        throw new Error(err)
    })

  } catch (err) {
    thunkAPI.rejectWithValue(err);
  }
});



export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    updateReviews: (state, action) => {
      state.reviews = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestions.fulfilled, (state, action) => {
        //console.log(action.payload);
        state.results = action.payload;

      })
      .addCase(getQuestions.rejected, (state, action) => {
        // console.log('error with payload: ', action.payload);
        state.error = action.error.message;
      })
      .addCase(getAnswers.fulfilled, (state, action) => {
        state.answers = action.payload;
      })
      .addCase(getAnswers.rejected, (state, action) => {
        // console.log('error with payload: ', action.payload);
        state.error = action.error.message;
      })
  }
})