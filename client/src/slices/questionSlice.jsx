import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
  product_id: 0;
  question_id: '',
  question_body : '',
  question_date: '',
  asker_name: '',
  question_helpfulness: 0,
  reported: false,
  answers: {}
};

const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    createPost(state, action) {},
    updatePost(state, action) {},
    deletePost(state, action) {},
  }
})