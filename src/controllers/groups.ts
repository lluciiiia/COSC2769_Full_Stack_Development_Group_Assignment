import { createAsyncThunk } from "@reduxjs/toolkit";
import { GroupParams, GroupType } from "../interfaces/Group";

export const fetchGroups = createAsyncThunk<GroupType[]>(
  "groups/fetchGroups",
  async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + `/api/groups `,
      );
      if (!response.ok) {
        console.error("Failed to fetch groups:", response.statusText);
        throw new Error("Failed to fetch groups");
      }
      const data: GroupType[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error in fetchGroups thunk:", error);
      throw error;
    }
  },
);

export const getGroupsByUserId = async (userId: string | undefined) => {
  if (!userId) return;

  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL + `/api/groups/user/${userId}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!response.ok) {
    console.error("Failed to fetch groups:", response.statusText);
    throw new Error("Failed to fetch groups");
  }

  const groups = await response.json();
  return groups;
};

export const handleAcceptGroup = async (
  groupId: string,
): Promise<GroupType> => {
  try {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + `/api/groups/accepted/${groupId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      console.error("Failed to update group:", response.statusText);
      throw new Error("Failed to update group");
    }

    const data: GroupType = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating group:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const createGroup = createAsyncThunk<GroupType, GroupParams>(
  "groups/createGroup",
  async (newGroup) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + `/api/groups`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newGroup),
        },
      );

      if (!response.ok) {
        console.error("Failed to create group:", response.statusText);
        throw new Error("Failed to create group");
      }

      const data: GroupType = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating group:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  },
);

export const fetchGroupWithMembers = createAsyncThunk<GroupType, string>(
  "groups/fetchGroupWithMembers",
  async (groupId: string) => {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + `/api/groups/${groupId}`,
    );
    if (!response.ok) {
      console.error("Failed to fetch group with members:", response.statusText);
      throw new Error("Failed to fetch group with members");
    }
    const data: GroupType = await response.json();
    return data;
  },
);

export const leaveGroup = createAsyncThunk<GroupType, string>(
  "groups/leaveGroup",
  async (groupId: string) => {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + `/api/groups/leave/${groupId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );
    if (!response.ok) {
      console.error("Failed to fetch group with members:", response.statusText);
      throw new Error("Failed to fetch group with members");
    }
    const data: GroupType = await response.json();
    return data;
  },
);

export const removeMemberFromGroup = createAsyncThunk<
  GroupType[],
  { groupId: string | undefined; userId: string }
>("user/removeMemberFromGroup", async ({ groupId, userId }) => {
  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL +
      `/api/groups/${groupId}/members/${userId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );

  if (!response.ok) {
    console.error(
      "Failed to remove this member from group:",
      response.statusText,
    );
    throw new Error("Failed to remove this member from group");
  }

  const data = await response.json();

  return data;
});

export const updateGroup = createAsyncThunk<
  GroupType,
  { groupId: string; updatedGroup: Partial<GroupType> }
>("groups/updateGroup", async ({ groupId, updatedGroup }) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + `/api/groups/${groupId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedGroup),
        credentials: "include",
      },
    );

    if (!response.ok) {
      console.error("Failed to update group:", response.statusText);
      throw new Error("Failed to update group");
    }

    const data: GroupType = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating group:", error);
    throw error;
  }
});
