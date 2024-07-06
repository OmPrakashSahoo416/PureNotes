import { createSlice } from "@reduxjs/toolkit";
// import { useState } from "react";


// const [showLeaderboard, setShowLeaderboard] = useState(false);

const initialState = {
  hidden: true,
}

const hiddenSlice = createSlice({
  name:"hidden",
  initialState,
  reducers:{
    setHidden:(state) => {
      state.hidden = !state.hidden
    }
    

  }
})

export const {setHidden} = hiddenSlice.actions;


export const hiddenReducer = hiddenSlice.reducer;