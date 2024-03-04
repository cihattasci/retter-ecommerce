import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductAPIResponseInterface } from "../../types";
import { APIStatus } from "../../utils/helpers";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (skip: number) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${skip}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching products: ${error}`);
    }
  }
);

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (searchQuery: string) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching products: ${error}`);
    }
  }
);

const initialState = {
  status: APIStatus.NULL as APIStatus,
  products: [] as ProductAPIResponseInterface[],
  searchedProducts: [] as ProductAPIResponseInterface[],
  total: 0,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = APIStatus.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = APIStatus.SUCCESS;
        state.products = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = APIStatus.ERROR;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.status = APIStatus.SUCCESS;
        state.searchedProducts = action.payload.products;
        state.total = action.payload.total;
      });
  },
});

export default productSlice.reducer;
