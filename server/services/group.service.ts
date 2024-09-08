import mongoose from "mongoose";
import Group from "../models/group";
import { group } from "console";

export const getAllGroups = async () => {
  try {
    const groups = await Group.find().select(
      "name _id visibility imageURL backgroundImageURL dateCreated members description",
    );
    return groups;
  } catch (error) {
    console.error("Error fetching all groups:", error);
    throw new Error("Failed to fetch groups");
  }
};
export const getGroupsByUserId = async (userId: string) => {
  try {
    const groups = await Group.find({
      $or: [{ members: userId }, { groupAdmin: userId }],
    }).select("_id name");

    console.log("Fetched Groups:", groups);
    return groups;
  } catch (error) {
    console.error("Error fetching groups by user ID in service:", error);
    throw new Error("Failed to fetch groups by user ID");
  }
};

export const acceptGroup = async (groupId: string) => {
  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { accepted: true },
      { new: true },
    );

    return updatedGroup;
  } catch (error) {
    console.error("Error accepting group:", error);
    throw new Error("Failed to accept group");
  }
};

export const removeMemberFromGroup = async (
  groupId: string,
  memberId: string,
) => {
  try {
    const groupObjectId = new mongoose.Types.ObjectId(groupId);
    const memberObjectId = new mongoose.Types.ObjectId(memberId);
    const updatedGroup = await Group.findByIdAndUpdate(
      groupObjectId,
      { $pull: { members: memberObjectId } },
      { new: true },
    );

    if (!updatedGroup) {
      throw new Error("Group not found");
    }

    return updatedGroup;
  } catch (error) {
    console.error("Error removing member from group:", error);
    throw new Error("Failed to remove member from group");
  }
};

export const getAllGroupsWithMembers = async () => {
  try {
    const groupsWithMembers = await Group.find()
      .select("members")
      .populate("members", "name email profilePictureURL");

    return groupsWithMembers;
  } catch (error) {
    console.error("Error fetching all groups with members:", error);
    throw new Error("Failed to fetch groups with members");
  }
};

export const createGroup = async (data: any) => {
  try {
    const newGroup = new Group(data);

    const result = await newGroup.save();

    return result;
  } catch (error) {
    console.error("Error creating group:", error);
    throw new Error("Failed to create group");
  }
};

export const updateGroup = async (groupId: string, updateData: any) => {
  try {
    const group = await Group.findByIdAndUpdate(groupId, updateData, {
      new: true,
    });

    if (!group) throw new Error("no group with the provided id");

    return group;
  } catch (error) {
    console.error("Error fetching group by id", error);
    throw new Error("Failed to fetch group");
  }
};
