import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductAPIResponseInterface } from "../../types";

const initialState = {
  cart: [] as ProductAPIResponseInterface[],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductAPIResponseInterface>) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload.id
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
