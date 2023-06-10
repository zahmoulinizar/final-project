import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  isCreate: false,
  isUpdating: false,
  message: "",
};
export const AddProd = createAsyncThunk(
  "prod/AddProd",
  async (product, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5500/prod/newProd",
        product
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getProd =createAsyncThunk(
  "prod/getProd",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:5500/prod/getProd/${id}`);
      console.log(res.data);
      return res.data;
      
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
)
export const deleteProd = createAsyncThunk(
  "prod/deleteProd",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`http://localhost:5500/prod/delete/${id}`);
      console.log(res.data);
      return res.data;
      
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  })
const prodSlice = createSlice({
  name: "prod",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddProd.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          isError: false,
          isSuccess: false,
          isCreate: false,
          message: "",
          product: null,
        };
      })
      .addCase(AddProd.fulfilled, (state, action) => {
        return {
            ...state,
            isLoading: false,
            isError: false,
            isSuccess: true,
            isCreate: true,
            message: "",
            product: action.payload,
          };
      })
      .addCase(AddProd.rejected, (state, action) => {
        return {
            ...state,
            isLoading: false,
            isError: true,
            isSuccess: false,
            isCreate: false,
            message: action.payload,
            product: null,
          };
      })
      .addCase(getProd.pending ,(state)=>{
        return {
          ...state,
          isLoading: true,
          isError: false,
          isSuccess: false,
          isCreate: false,
          message: "",
        }
      })
      .addCase(getProd.fulfilled, (state, action) => {
        return {
          isLoading: false,
          isError: false,
          isSuccess: true,
          isCreate: true,
          message: action.payload.message,
          product: action.payload.product,
        };
      })
      .addCase(getProd.rejected, (state, action) => {
        return {
          isLoading: false,
          isError: true,
          isSuccess: false,
          isCreate: false,
          message: action.payload.message,
    }
  })
  
}
});
export default prodSlice.reducer 
