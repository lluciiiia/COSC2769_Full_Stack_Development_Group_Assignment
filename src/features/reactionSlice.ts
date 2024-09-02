import { createSlice } from "@reduxjs/toolkit";
import { ReactProps } from "../interfaces/Reactions";
import { createReaction, fetchReaction } from "../controllers/reactions";
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
      console.log();
      if (action.payload && action.payload.length > 0) {
        state.isReacted = true;
        state.reactions = action.payload;
        state.reactionType = action.payload.reaction.reactionType;
      } else {
        state.isReacted = false;
        state.reactions = [];
      }
    });
  },
});

export const returnReactionType = (state: AppState) => {
  return state.react.reactionType;
};
export default reactSlice.reducer;
