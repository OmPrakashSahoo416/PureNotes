import { createSlice } from "@reduxjs/toolkit";
// import { useState } from "react";


// const [showLeaderboard, setShowLeaderboard] = useState(false);

const initialState = {
  selectedNote: {},
}

const selectedNoteSlice = createSlice({
  name:"selectedNote",
  initialState,
  reducers:{
    setSelectedNote:(state, action) => {
      state.selectedNote = action.payload
    }
    

  }
})

export const {setSelectedNote} = selectedNoteSlice.actions;


export const selectedNoteReducer = selectedNoteSlice.reducer;