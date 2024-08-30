import { createAsyncThunk } from "@reduxjs/toolkit";

export const acceptGroup = createAsyncThunk(
  "admin/acceptGroup",
  async (groupId: string) => {
    const response = await fetch(
      `http://localhost:8080/api/groups/accepted/${groupId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      },
    );

    if (response.ok) {
      console.log(`Group ${groupId} accepted.`);
    } else {
      console.error("Failed to accept group. Status:", response.status);
      throw new Error("Failed to accept group");
    }
  },
);
