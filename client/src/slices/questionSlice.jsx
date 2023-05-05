import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
const baseAPIURL = "https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/";

const initialState = {
  product_id: 0;
  results: [

  ];
  answers: {

  }

};

export const getQuestions = createAsyncThunk('questions/getQuestions', async(id, thunkAPI) => {
  try {
    axios.get(`${baseAPIURL}/product/${id}/related`).then(res => res.data)
  } catch (err) {
    thunkAPI.rejectWithValue(err);
  }
});

export const getAnswers = createAsyncThunk('questions/getAnswers', async(id, thunkAPI) => {
  try {
    axios.get(`${baseAPIURL}/product/${id}`).then(res => res.data)
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