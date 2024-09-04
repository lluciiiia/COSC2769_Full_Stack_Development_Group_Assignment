import { createAsyncThunk } from "@reduxjs/toolkit";

export const acceptGroup = createAsyncThunk<
  { message: string },
  string | undefined
>("admin/acceptGroup", async (groupId) => {
  const response = await fetch(
    `http://localhost:8080/api/groups/accepted/${groupId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    },
  );

  if (!response.ok) {
    console.error("Failed to accept group. Status:", response.statusText);
    throw new Error("Failed to accept group");
  }

  const data = await response.json();

  return data;
});

export const deleteGroup = createAsyncThunk<{ message: string }, string>(
  "admin/deleteGroup",
  async (groupId) => {
    const response = await fetch(
      `http://localhost:8080/api/groups/${groupId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      },
    );

    if (!response.ok) {
      console.error("Failed to accept group. Status:", response.statusText);
      throw new Error("Failed to accept group");
    }

    const data = await response.json();
    return data;
  },
);

export const suspendUser = createAsyncThunk<{ message: string }, string>(
  "admin/suspendUser",
  async (userId) => {
    const response = await fetch(
      `http://localhost:8080/api/admin/suspend/${userId}`,
      { method: "PUT", headers: { "Content-Type": "application/json" } },
    );

    if (!response.ok) {
      console.error(
        "Failed to suspend this user. Status:",
        response.statusText,
      );
      throw new Error("Failed to suspend this user");
    }

    const data = await response.json();

    return data;
  },
);

export const resumeUser = createAsyncThunk<{ message: string }, string>(
  "admin/resumeUser",
  async (userId) => {
    const response = await fetch(
      `http://localhost:8080/api/admin/resume/${userId}`,
      { method: "PUT", headers: { "Content-Type": "application/json" } },
    );

    if (!response.ok) {
      console.error(
        "Failed to suspend this user. Status:",
        response.statusText,
      );
      throw new Error("Failed to suspend this user");
    }

    const data = await response.json();

    return data;
  },
);
