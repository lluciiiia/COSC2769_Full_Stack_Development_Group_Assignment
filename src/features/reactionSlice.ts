import { createSlice } from "@reduxjs/toolkit";
import { ReactProps } from "../interfaces/reactions";



const initialState:  ReactProps={
    reactions: []
};

const reactSlice= createSlice({
    name:"react",
    initialState,
    reducers:{},
    extraReducers(builder){
        
    },
})

export default reactSlice.reducer;