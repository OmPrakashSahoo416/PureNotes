import { createSlice } from "@reduxjs/toolkit";
// import { useState } from "react";

// const [showLeaderboard, setShowLeaderboard] = useState(false);

const initialState = {
  searchText: "",
};

const searchTextSlice = createSlice({
  name: "searchText",
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const { setSearchText } = searchTextSlice.actions;

export const searchTextReducer = searchTextSlice.reducer;
