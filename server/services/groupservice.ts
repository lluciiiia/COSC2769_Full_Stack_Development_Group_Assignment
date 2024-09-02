import Group from "../models/group";

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
    const groups = await Group.find({ members: userId }).select("_id name");
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
      { new: true }
    );

    return updatedGroup;
  } catch (error) {
    console.error("Error accepting group:", error);
    throw new Error("Failed to accept group");
  }
};

export const removeMemberFromGroup = async (groupId: string, memberId: string) => {
  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { $pull: { members: memberId } }, 
      { new: true }
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
