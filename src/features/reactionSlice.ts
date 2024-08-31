import { createSlice } from "@reduxjs/toolkit";
import { ReactProps } from "../interfaces/reactions";
import { createReaction } from "../controllers/reactions";

const initialState: ReactProps = {
    createComplete: false,
    reactions: []
};

const reactSlice = createSlice({
    name: "react",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createReaction.fulfilled, (state, action) => {
            state.createComplete = true;
            state.reactions.push(action.payload);
        });
    },
});

export default reactSlice.reducer;
