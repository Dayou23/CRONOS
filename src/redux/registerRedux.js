import { createSlice } from "@reduxjs/toolkit";

const registerRedux = createSlice({
  name: "register",
  initialState: {
    currentUser: null,
    errData: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    registerFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errData = action.payload;
    },
  },
});

export const { registerStart, registerSuccess, registerFailure } =
  registerRedux.actions;
export default registerRedux.reducer;
