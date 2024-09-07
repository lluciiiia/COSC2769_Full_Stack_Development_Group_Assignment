import { createSlice } from "@reduxjs/toolkit";
import { ReactProps } from "../interfaces/Reactions";
import {
  createReaction,
  fetchReaction,
  deleteReaction,
} from "../controllers/reactions";
import { AppState } from "../app/store";

const initialState: ReactProps = {
  createComplete: false,
  reactions: [],
  isReacted: false,
  reactionType: "LIKE",
};

const reactSlice = createSlice({
  name: "react",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createReaction.fulfilled, (state, action) => {
      state.createComplete = true;
      state.reactions.push(action.payload);
      state.isReacted = true;
    });
    builder.addCase(fetchReaction.fulfilled, (state, action) => {
      if (action.payload && action.payload.length > 0) {
        state.isReacted = true;
        state.reactions = action.payload;
        state.reactionType = action.payload.reaction.reactionType;
      } else {
        state.isReacted = false;
        state.reactions = [];
      }
    });
    builder.addCase(deleteReaction.fulfilled, (state, action) => {
      state.isReacted = false;
      state.reactions = action.payload;
    });
  },
});

export const returnReactionType = (state: AppState) => {
  return state.react.reactionType;
};
export const selectReactions = (state: AppState) => state.react.reactions;
export const selectIsReacted = (state: AppState) => state.react.isReacted;
export const selectCreateComplete = (state: AppState) =>
  state.react.createComplete;
export default reactSlice.reducer;
