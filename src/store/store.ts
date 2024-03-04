import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/CartSlice";
import productSlice from "./slices/ProductSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    products: productSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
