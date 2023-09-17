import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    isFetching: false,
    error: false,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },

    deleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action) => {
      state.quantity -= 1;
      state.total -= action.payload.price * action.payload.quantity;
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload._id),
        1
      );
    },
    deleteProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logoutCart: (state) => {
      state.quantity = 0;
      state.total = 0;
      state.products = [];
      // state.currentUser = null;
    },
  },
});

export const {
  addProduct,
  logoutCart,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
} = cartSlice.actions;
export default cartSlice.reducer;
