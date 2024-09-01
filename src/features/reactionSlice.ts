import { createSlice } from "@reduxjs/toolkit";
import { ReactProps } from "../interfaces/reactions";
import { createReaction, fetchReaction } from "../controllers/reactions";

const initialState: ReactProps = {
    createComplete: false,
    reactions: [],
    isReacted: false,
    reactionType:'LIKE'
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
            // fetchReaction could return an array of reactions or an empty array
            if (action.payload && action.payload.length > 0) {
                state.isReacted = true; 
                state.reactions = action.payload;
            } else {
                state.isReacted = false;  
                state.reactions = [];
            }
        });
    },
});

export default reactSlice.reducer;
