
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GroupType } from "../interfaces/Group";

const API_URL = "http://localhost:8080/api/groups";


export const fetchGroups = createAsyncThunk<GroupType[]>(
  "groups/fetchGroups",  
  async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      console.error("Failed to fetch groups:", response.statusText);
      throw new Error("Failed to fetch groups");
    }
    const data: GroupType[] = await response.json();
    return data;
  },
);


