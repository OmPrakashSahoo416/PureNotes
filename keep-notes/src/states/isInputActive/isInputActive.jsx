import { createSlice } from "@reduxjs/toolkit";
// import { useState } from "react";

const initialState = {
  isInputActive: false,
};

const isInputActiveSlice = createSlice({
  name: "isInputActive",
  initialState,
  reducers: {
    setIsInputActive: (state, action) => {
      state.isInputActive = action.payload;
    },
  },
});

export const { setIsInputActive } = isInputActiveSlice.actions;

export const isInputActiveReducer = isInputActiveSlice.reducer;
