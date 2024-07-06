import { createSlice } from "@reduxjs/toolkit";
// import { useState } from "react";

const initialState = {
  isFocus: false,
};

const isFocusSlice = createSlice({
  name: "isFocus",
  initialState,
  reducers: {
    setIsFocus: (state, action) => {
      state.isFocus = action.payload;
    },
  },
});

export const { setIsFocus } = isFocusSlice.actions;

export const isFocusReducer = isFocusSlice.reducer;
