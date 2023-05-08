import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
const baseAPIURL = "http://localhost:3000/";

const initialState = {
  product_id: '',
  results: [],
  answers: {},

};

export const getQuestions = createAsyncThunk('questions/getQuestions', async(id, thunkAPI) => {
  try {
    axios.get(`${baseAPIURL}qa/questions/`,{
      param: {
        product_id: id,
      }
    }).then(res => res.data)
  } catch (err) {
    thunkAPI.rejectWithValue(err);
  }
});

export const getAnswers = createAsyncThunk('questions/getAnswers', async(id, thunkAPI) => {
  try {
    axios.get(`${baseAPIURL}qa/questions/${id}/answers`).then(res => res.data)
  } catch (err) {
    thunkAPI.rejectWithValue(err);
  }
});



export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.questions = action.payload
      })
      .addCase(getQuestions.rejected, (state, action) => {
        console.log('error with payload: ', action.payload);
        state.error = action.error.message;
      })
      .addCase(getAnswers.fulfilled, (state, action) => {
        state.answers.push(action.payload);
      })
      .addCase(getAnswers.rejected, (state, action) => {
        console.log('error with payload: ', action.payload);
        state.error = action.error.message;
      })
  }
})