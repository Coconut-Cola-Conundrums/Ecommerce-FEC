import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  relatedIds: [],
  relatedProducts: [],
  outfits: [],
  error: null
}

const baseAPIURL = "http://localhost:3000"

export const getRelatedIds = createAsyncThunk('products/getRelatedIds', async(id, thunkAPI) => {
  try {
    return axios.get(`${baseAPIURL}/products/${id}/related`).then(res => res.data)
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const getRelatedProduct = createAsyncThunk('products/getRelatedProduct', async(id, thunkAPI) => {
  try {
    return axios.get(`${baseAPIURL}/products/${id}`).then(res => res.data)
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const getOutfit = createAsyncThunk('products/getOutfit', async(id, thunkAPI) => {
  try {
    return axios.get(`${baseAPIURL}/products/${id}`).then(res => res.data)
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

//need another aysnc thunk func to axios.get /products/:product_id/styles and store it into your slice
export const getProductStyle = createAsyncThunk('products/getProductStyle', async(id, thunkAPI) => {
  try {
    return axios.get(`${baseAPIURL}/products/${id}/styles`).then(res => res.data)
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
})


export const comparisonSlice = createSlice({
  name: 'relatedItems',
  initialState,
  reducers: {
    removeOutfit: (state, action) => {
      const outfitId = action.payload;
      state.outfits = state.outfits.filter((outfit) => outfit.id !== outfitId);
    },
    addOutfits: (state, action) => {
      const outfits = action.payload;
      state.outfits = [...state.outfits, ...outfits];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRelatedIds.fulfilled, (state, action) => {
        state.relatedIds = action.payload
      })
      .addCase(getRelatedIds.rejected, (state, action) => {
        // console.log('error with payload: ', action.payload);
        state.error = action.error.message;
      })
      .addCase(getRelatedProduct.fulfilled, (state, action) => {
<<<<<<< HEAD
        // console.log('this is whats wrong, getRelatedProduct')
=======
>>>>>>> be60cb0d40ae1f37eef44b06a7d302ab5dc11f4f
        state.relatedProducts = [...state.relatedProducts, action.payload];
      })
      .addCase(getRelatedProduct.rejected, (state, action) => {
        // console.log('error with payload: ', action.payload);
        state.error = action.error.message;
      })
      .addCase(getProductStyle.fulfilled, (state, action) => {
        const { product_id, results } = action.payload;
        const styles = results.map((result) => ({
          style_id: result.style_id,
          name: result.name,
          original_price: result.original_price,
          sale_price: result.sale_price,
          photos: result.photos
        }));

        const updatedProducts = state.relatedProducts.map((product) => {
          if (product.id === Number(product_id)) {
            return {
              ...product,
              productStyles: styles
            };
          }
          return product;
        });

        state.relatedProducts = updatedProducts;

        const updatedOutfits = state.outfits.map((outfit) => {
          if (outfit.id === Number(product_id)) {
            return {
              ...outfit,
              productStyles: styles
            };
          }
          return outfit;
        });

        state.outfits = updatedOutfits;
      })
      .addCase(getProductStyle.rejected, (state, action) => {
        // console.log('error with payload: ', action.payload);
        state.error = action.error.message;
      })
      .addCase(getOutfit.fulfilled, (state, action) => {
        state.outfits.push(action.payload);

      })
      .addCase(getOutfit.rejected, (state, action) => {
        // console.log('error with payload: ', action.payload);
        state.error = action.error.message;
      })
  }
})