import { createSlice } from "@reduxjs/toolkit";
// import { useState } from "react";


// const [showLeaderboard, setShowLeaderboard] = useState(false);

const initialState = {
  showLeaderBoard: false,
}

const leaderboardSlice = createSlice({
  name:"leaderboard",
  initialState,
  reducers:{
    displayLeaderboard:(state) => {
      state.showLeaderBoard = !state.showLeaderBoard
    }
    

  }
})

export const {displayLeaderboard} = leaderboardSlice.actions;


export const leaderboardReducer = leaderboardSlice.reducer;