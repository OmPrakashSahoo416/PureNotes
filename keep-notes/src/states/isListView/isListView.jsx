import { createSlice } from "@reduxjs/toolkit";
// import { useState } from "react";


// const [showLeaderboard, setShowLeaderboard] = useState(false);

const initialState = {
  isListView: false,
}

const isListViewSlice = createSlice({
  name:"isListView",
  initialState,
  reducers:{
    setIsListView:(state) => {
      state.isListView = !state.isListView
    }
    

  }
})

export const {setIsListView} = isListViewSlice.actions;


export const isListViewReducer = isListViewSlice.reducer;