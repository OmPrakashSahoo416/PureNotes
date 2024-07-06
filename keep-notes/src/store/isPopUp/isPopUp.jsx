import { createSlice } from "@reduxjs/toolkit";
// import { useState } from "react";

const initialState = {
  isPopUp: false,
};

const isPopUpSlice = createSlice({
  name: "isPopUp",
  initialState,
  reducers: {
    setIsPopUp: (state) => {
      state.isPopUp = !state.isPopUp;
    },
  },
});

export const { setIsPopUp } = isPopUpSlice.actions;

export const isPopUpReducer = isPopUpSlice.reducer;
