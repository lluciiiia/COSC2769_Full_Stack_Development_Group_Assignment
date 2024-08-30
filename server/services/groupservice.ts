import Group from "../models/group";

export const getAllGroups = async () => {
  try {
    // Fetch all groups and include all relevant fields
    const groups = await Group.find().select(
      "name _id visibility imageURL backgroundImageURL dateCreated members description",
    );
    return groups; // Return the array of groups
  } catch (error) {
    console.error("Error fetching all groups:", error);
    throw new Error("Failed to fetch groups");
  }
};
export const getGroupsByUserId = async (userId: string) => {
  try {
    // Fetch groups where the user is a member
    const groups = await Group.find({ members: userId }).select("_id name");
    console.log("Fetched Groups:", groups); // Log the fetched groups
    return groups;
  } catch (error) {
    console.error("Error fetching groups by user ID in service:", error);
    throw new Error("Failed to fetch groups by user ID");
  }
};

export const acceptGroup = async (groupId: string) => {
  try {
    // Find the group by ID and update the accepted attribute to true
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