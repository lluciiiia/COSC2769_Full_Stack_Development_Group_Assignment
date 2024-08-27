import User from "../models/user";
//get 1 user by id
export const getUserById = async (userId: string) => {
  try {
    const user = await User.findById(userId).populate({
      path: "friends",
      select: "name profilePictureURL",
    });

    if (!user) throw new Error("User can not found with the provided id");
    return user;
  } catch (error) {
    console.error("Error fetching user by id", error);
    throw new Error("Failed to fetch user");
  }
};

export const updateUser = async (userId: string, updateData: any) => {
  try {
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!user) throw new Error("User can not found with the provided id");

    return user;
  } catch (error) {
    console.error("Error fetching user by id", error);
    throw new Error("Failed to fetch user");
  }
};
