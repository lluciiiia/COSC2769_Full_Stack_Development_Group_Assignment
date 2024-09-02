import User from "../models/user";
import bcrypt from "bcrypt";
import Admin from "../models/admin";
export const regisNewAccount = async (data: any) => {
  try {
    const { email, name, password } = data;

    let user = await User.findOne({ email });
    if (user) {
      return { status: 400, message: "User already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashPassword,
      profilePictureURL: "",
      introduction: "",
      address: "",
      age: null,
      phoneNumber: "",
      activeStatus: true,
      education: "",
      location: "",
      relationship: "",
      job: "",
      jobDescription: "",
      degree: "",
      years: "",
      educationDescription: "",
      inRelationship: "",
      bio: "",
      friends: [],
    });

    await user.save();

    return { status: 201, message: "User registered successfully" };
  } catch (error) {
    console.error("Error in regisNewAccount:", error);
    return { status: 500, message: "Server error" };
  }
};
export const loginUser = async (req: any) => {
  try {
    const { email, password } = req.body;

    // Check if the email belongs to a regular user
    let user = await User.findOne({ email });
    let isAdmin = false;

    if (!user) {
      // If not a user, check if it's an admin
      user = await Admin.findOne({ username: email });
      if (!user) {
        return { status: 400, message: "User not found" };
      }
      isAdmin = true;
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { status: 400, message: "Invalid credentials" };
    }

    // For regular users, check if the account is active
    if (!isAdmin && !user.activeStatus) {
      return { status: 400, message: "Your account is inactive" };
    }

    // Save user information in session
    req.session.user = {
      id: user._id,
      isAuthenticated: true,
      name: user.name || '',
      profilePictureURL: user.profilePictureURL || "",
      isAdmin: isAdmin,
      email: user.email || '',
    };

    return {
      status: 200,
      message: "Login successful",
      user: req.session.user,
    };
  } catch (error) {
    console.error("Error in loginUser:", error);
    return { status: 500, message: "Server error" };
  }
};

export const logoutUser = (req: any, res: any) => {
  req.session.destroy((err: any) => {
    if (err) {
      return res.status(500).json({ message: "Failed to log out" });
    }

    // Clear cookies
    res.clearCookie("isAuthenticated");
    res.clearCookie("userId");
    res.clearCookie("userName");

    return res.status(200).json({ message: "Logout successful" });
  });
};
