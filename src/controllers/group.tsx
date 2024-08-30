import { createAsyncThunk } from "@reduxjs/toolkit";
import { GroupParams, GroupType } from "../interfaces/Group";

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

export const handleAcceptGroup = async (groupId: string): Promise<GroupType> => {
    try {
      const response = await fetch(`${API_URL}/accepted/${groupId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        console.error('Failed to update group:', response.statusText);
        throw new Error('Failed to update group');
      }
  
      const data: GroupType = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating group:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  };