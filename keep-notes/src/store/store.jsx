import { configureStore } from "@reduxjs/toolkit";
import {leaderboardReducer} from "../states/leaderboard/leaderboardSlice"
import { hiddenReducer } from "../states/hidden/hiddenSlice";
import { isListViewReducer } from "../states/isListView/isListView";
import { searchTextReducer } from "../states/searchText/searchText";
import { selectedNoteReducer } from "../states/selectedNote/selectedNote";
import { isFocusReducer } from "../states/isFocus/isFocus";






const store = configureStore({
  reducer:{
    leaderboard: leaderboardReducer,
    hidden: hiddenReducer,
    isListView:isListViewReducer,
    searchText:searchTextReducer,
    selectedNote:selectedNoteReducer,
    isFocus:isFocusReducer,
  }
})

export default store;